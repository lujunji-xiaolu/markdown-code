import { rootDirState } from "@/atoms";
import Button from "@/components/button";
import Typography from "@mui/material/Typography";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import * as React from "react";
import { useSetRecoilState } from "recoil";
import { Dir } from "./types";
import { findParentDir } from "./utils";

export default function OpenFolder() {
  const setRootDir = useSetRecoilState(rootDirState);

  const handleOpenFolder = () => invoke("open_folder", { newWindow: false });

  React.useEffect(() => {
    let rootDir: Dir | null = null;
    const unlisten = appWindow.listen("create", (event) => {
      const { path, file_name, is_file, content, components, ready } =
        event.payload as {
          path: string;
          file_name: string;
          is_file: string;
          components: string[];
          content: string;
          ready: boolean;
        };
      if (ready) {
        setRootDir(rootDir);
      } else if (components.length === 0) {
        rootDir = {
          path,
          fileName: file_name,
          dirs: [],
          files: [],
        };
      } else {
        const parentDir = findParentDir(rootDir!, components);
        if (is_file) {
          parentDir.files.push({
            path,
            fileName: file_name,
            content,
          });
        } else {
          parentDir.dirs.push({
            path,
            fileName: file_name,
            dirs: [],
            files: [],
          });
        }
      }
    });
    return () => {
      unlisten.then((value) => value()).catch(console.error);
    };
  }, []);

  return (
    <>
      <Typography variant="body2">You have not yet opened a folder.</Typography>
      <Button
        variant="accent"
        sx={{ marginTop: "8px" }}
        onClick={handleOpenFolder}
      >
        Open Folder
      </Button>
    </>
  );
}
