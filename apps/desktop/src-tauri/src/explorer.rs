use crate::state::Database;
use std::path::Path;
use std::sync::Mutex;
use tauri::api::dialog::blocking::FileDialogBuilder;
use walkdir::WalkDir;

fn whether_to_ignore(path: &Path) -> bool {
    let file_name = path.file_name().unwrap().to_string_lossy().to_string();

    if path.is_dir() {
        return file_name.starts_with(".") || file_name.eq("node_modules");
    } else {
        return file_name.starts_with(".")
            || file_name.ends_with(".asar")
            || !file_name.ends_with(".md");
    }
}

#[derive(Clone, serde::Serialize)]
struct Payload {
    path: String,
    file_name: String,
    is_file: bool,
    components: Vec<String>,
}

#[derive(Clone, serde::Serialize)]
struct ReadyPayload {
    ready: bool,
}

#[tauri::command]
pub async fn open_folder(
    window: tauri::Window,
    database: tauri::State<'_, Mutex<Database>>,
) -> Result<Option<String>, String> {
    match FileDialogBuilder::new().pick_folder() {
        Some(path) => {
            let picked_dir = path.to_string_lossy().to_string();

            if let Some(opened_dir) = database.lock().unwrap().opened_dirs.get(window.label()) {
                if opened_dir.eq(&picked_dir) {
                    return Ok(None);
                }
            }

            database
                .lock()
                .unwrap()
                .opened_dirs
                .insert(window.label().to_string(), picked_dir.to_string());

            let walker = WalkDir::new(&path).into_iter();
            for entry in walker.filter_entry(|e| !whether_to_ignore(&e.path())) {
                let dir_path = entry.unwrap().path().to_path_buf();
                window
                    .emit(
                        "init-root-dir",
                        Payload {
                            path: dir_path.to_string_lossy().to_string(),
                            file_name: dir_path.file_name().unwrap().to_string_lossy().to_string(),
                            is_file: dir_path.is_file(),
                            components: dir_path
                                .strip_prefix(&path)
                                .unwrap()
                                .iter()
                                .map(|name| name.to_string_lossy().to_string())
                                .collect(),
                        },
                    )
                    .unwrap();
            }

            window
                .emit("init-root-dir", ReadyPayload { ready: true })
                .unwrap();

            Ok(Some(picked_dir))
        }
        None => Ok(None),
    }
}
