#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod explorer;
mod state;

use std::collections::HashMap;
use std::sync::Mutex;
use tauri::Manager;
use tauri_plugin_store::PluginBuilder;
use window_vibrancy::apply_mica;

fn main() {
    tauri::Builder::default()
        .plugin(PluginBuilder::default().build())
        .manage(Mutex::new(state::Database {
            opened_dirs: HashMap::new(),
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
        .invoke_handler(tauri::generate_handler![explorer::open_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
