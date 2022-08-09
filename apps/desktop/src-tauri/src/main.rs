#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use hotwatch::{Event, Hotwatch};
use rand::{distributions::Alphanumeric, Rng};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::api::dialog::blocking::FileDialogBuilder;
use tauri::Manager;
use tauri_plugin_store::PluginBuilder;
use walkdir::WalkDir;
use window_vibrancy::apply_mica;

fn generate_unique_string() -> String {
    let s: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(5)
        .map(char::from)
        .collect();
    s
}

fn whether_to_ignore(path_buf: &PathBuf) -> bool {
    let file_name = path_buf.file_name().unwrap().to_string_lossy().to_string();

    if path_buf.is_dir() {
        return file_name.starts_with(".") || file_name.eq("node_modules");
    } else {
        return file_name.starts_with(".")
            || file_name.ends_with(".asar")
            || !file_name.ends_with(".md");
    }
}

#[derive(Clone, serde::Serialize)]
struct CreatePayload {
    path: String,
    file_name: String,
    is_file: bool,
    content: Option<String>,
    components: Vec<String>,
}

#[derive(Clone, serde::Serialize)]
struct WritePayload {
    path: String,
    content: String,
    components: Vec<String>,
}

#[derive(Clone, serde::Serialize)]
struct DeletePayload {
    components: Vec<String>,
    file_name: String,
}

#[derive(Clone, serde::Serialize)]
struct ReadyPayload {
    ready: bool,
}

struct Database {
    opened_dir_map: HashMap<String, String>,
    opened_files_map: HashMap<String, Vec<String>>,
    watcher: Hotwatch,
}

#[tauri::command]
async fn open_folder(
    handle: tauri::AppHandle,
    window: tauri::Window,
    database: tauri::State<'_, Mutex<Database>>,
    new_window: bool,
) -> Result<(), String> {
    if let Some(picked_dir) = FileDialogBuilder::new().pick_folder() {
        // TODO: symbolic link
        // TODO: Recent Documents
        let picked_dir = picked_dir.canonicalize().unwrap();
        let picked_dir_path = picked_dir.to_string_lossy().to_string();
        let mut window = window;

        if new_window {
            window = tauri::WindowBuilder::new(
                &handle,
                generate_unique_string(), /* the unique window label */
                tauri::WindowUrl::App("index.html".into()),
            )
            .build()
            .unwrap();

            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                window.open_devtools();
            }

            // TODO: Waiting for a better solution
            println!("Initializing...");
            std::thread::sleep(std::time::Duration::from_secs(1));
            println!("Done initializing.");
        }

        let label = window.label().to_string();

        if let Some(opened_dir) = database.lock().unwrap().opened_dir_map.get(&label) {
            if opened_dir.eq(&picked_dir_path) {
                return Err("The picked folder is already open.".to_string());
            } else {
                database
                    .lock()
                    .unwrap()
                    .watcher
                    .unwatch(opened_dir)
                    .unwrap();
            }
        }

        database
            .lock()
            .unwrap()
            .opened_dir_map
            .insert(label.to_string(), picked_dir_path);

        let walker = WalkDir::new(&picked_dir).into_iter();
        for entry in walker.filter_entry(|e| !whether_to_ignore(&e.path().to_path_buf())) {
            let path = entry.unwrap().path().canonicalize().unwrap();
            let mut content = None;
            if path.is_file() {
                content = Some(fs::read_to_string(path.to_path_buf()).unwrap());
            }
            window
                .emit(
                    "create",
                    CreatePayload {
                        path: path.to_string_lossy().to_string(),
                        file_name: path.file_name().unwrap().to_string_lossy().to_string(),
                        is_file: path.is_file(),
                        content,
                        components: path
                            .strip_prefix(&picked_dir)
                            .unwrap()
                            .iter()
                            .map(|name| name.to_string_lossy().to_string())
                            .collect(),
                    },
                )
                .unwrap();
        }

        window.emit("create", ReadyPayload { ready: true }).unwrap();

        database
            .lock()
            .unwrap()
            .watcher
            .watch(picked_dir.to_path_buf(), move |event: Event| match event {
                Event::Create(path) => {
                    #[cfg(debug_assertions)] // only include this code on debug builds
                    {
                        println!("{} has been created.", path.to_string_lossy().to_string());
                    }

                    if !whether_to_ignore(&path) {
                        let mut content = None;
                        if path.is_file() {
                            content = Some(fs::read_to_string(&path).unwrap());
                        }

                        window
                            .emit(
                                "create",
                                CreatePayload {
                                    path: path.to_string_lossy().to_string(),
                                    file_name: path
                                        .file_name()
                                        .unwrap()
                                        .to_string_lossy()
                                        .to_string(),
                                    is_file: path.is_file(),
                                    content,
                                    components: path
                                        .strip_prefix(&picked_dir)
                                        .unwrap()
                                        .iter()
                                        .map(|name| name.to_string_lossy().to_string())
                                        .collect(),
                                },
                            )
                            .unwrap();

                        window.emit("create", ReadyPayload { ready: true }).unwrap();
                    }
                }
                Event::Write(path) => {
                    #[cfg(debug_assertions)] // only include this code on debug builds
                    {
                        println!("{} has been written.", path.to_string_lossy().to_string());
                    }
                    if !whether_to_ignore(&path) {
                        window
                            .emit(
                                "write",
                                WritePayload {
                                    path: path.to_string_lossy().to_string(),
                                    content: fs::read_to_string(path.to_path_buf()).unwrap(),
                                    components: path
                                        .strip_prefix(&picked_dir)
                                        .unwrap()
                                        .iter()
                                        .map(|name| name.to_string_lossy().to_string())
                                        .collect(),
                                },
                            )
                            .unwrap();
                    }
                }
                Event::Remove(path) => {
                    #[cfg(debug_assertions)] // only include this code on debug builds
                    {
                        println!("{} has been removed.", path.to_string_lossy().to_string());
                    }

                    if !whether_to_ignore(&path.parent().unwrap().to_path_buf()) {
                        window
                            .emit(
                                "remove",
                                DeletePayload {
                                    components: path
                                        .strip_prefix(&picked_dir)
                                        .unwrap()
                                        .iter()
                                        .map(|name| name.to_string_lossy().to_string())
                                        .collect(),
                                    file_name: path
                                        .file_name()
                                        .unwrap()
                                        .to_string_lossy()
                                        .to_string(),
                                },
                            )
                            .unwrap();
                    }
                }
                Event::Rename(source, destination) => {
                    #[cfg(debug_assertions)] // only include this code on debug builds
                    {
                        println!("{} has been moved.", source.to_string_lossy().to_string());
                    }

                    println!("{}", source.is_dir());

                    // if !whether_to_ignore(&source) || !whether_to_ignore(&destination) {
                    //     window
                    //         .emit(
                    //             "remove",
                    //             DeletePayload {
                    //                 components: path
                    //                     .strip_prefix(&picked_dir)
                    //                     .unwrap()
                    //                     .iter()
                    //                     .map(|name| name.to_string_lossy().to_string())
                    //                     .collect(),
                    //                 file_name: path
                    //                     .file_name()
                    //                     .unwrap()
                    //                     .to_string_lossy()
                    //                     .to_string(),
                    //             },
                    //         )
                    //         .unwrap();
                    // }
                }
                _ => (),
            })
            .expect("failed to watch file!");

        Ok(())
    } else {
        Err("The user closed the dialog.".to_string())
    }
}

#[tauri::command]
async fn remove_from_opened_files(
    window: tauri::Window,
    database: tauri::State<'_, Mutex<Database>>,
    path: String,
) -> Result<(), String> {
    if let Some(opened_files) = database
        .lock()
        .unwrap()
        .opened_files_map
        .get_mut(&window.label().to_string())
    {
        if opened_files.contains(&path) {
            opened_files.retain(|file_path| !file_path.eq(&path));
            database.lock().unwrap().watcher.unwatch(path).unwrap();
        }
    }
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(PluginBuilder::default().build())
        .manage(Mutex::new(Database {
            opened_dir_map: HashMap::new(),
            opened_files_map: HashMap::new(),
            watcher: Hotwatch::new().expect("hotwatch failed to initialize!"),
        }))
        .setup(|app| {
            let window = app
                .get_window("main")
                .expect("Failed to fetch a single window from the manager.");

            #[cfg(target_os = "windows")]
            apply_mica(&window)
                .expect("Unsupported platform! 'apply_mica' is only supported on Windows 11");

            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                window.open_devtools();
            }

            // Mica Background in Tauri JS https://github.com/tauri-apps/window-vibrancy/issues/52
            window.minimize().unwrap();
            window.unminimize().unwrap();

            window.show().unwrap();

            window.set_focus().unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_folder,
            remove_from_opened_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
