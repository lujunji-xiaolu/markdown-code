import { createEditor, deserialize } from "@/pages/workbench/features/editor";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeView } from "@mui/lab";
import TreeItem from "@mui/lab/TreeItem";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import * as React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editorGroupsState } from "../../atoms/editor-group";
import { rootDirState } from "../../atoms/explorer";
import OpenFolder from "./open-folder";
import { Dir, File } from "./types";
import { findParentDir } from "./utils";

export default function Explorer() {
  const [rootDir, setRootDir] = useRecoilState(rootDirState);
  const setEditorGroups = useSetRecoilState(editorGroupsState);

  React.useEffect(() => {
    let rootDir: Dir | null = null;
    const unlisten = appWindow.listen("init-root-dir", (event) => {
      const { path, file_name, is_file, components, ready } = event.payload as {
        path: string;
        file_name: string;
        is_file: string;
        components: string[];
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
          components: [],
        };
      } else {
        const parentDir = findParentDir(rootDir!, components);
        if (is_file) {
          parentDir.files.push({
            path,
            fileName: file_name,
            components,
          });
        } else {
          parentDir.dirs.push({
            path,
            fileName: file_name,
            components,
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

  if (rootDir === null) return <OpenFolder />;

  const pushTab = async (file: File) => {
    try {
      const content = await invoke<string>("read_to_string", {
        path: file.path,
      });
      setEditorGroups((oldEditorGroups) => {
        if (
          oldEditorGroups.groups[oldEditorGroups.currentGroupIndex] ===
          undefined
        ) {
          oldEditorGroups.groups[oldEditorGroups.currentGroupIndex] = {
            tabs: [],
            activeIndex: 0,
          };
        }

        const oldEditorGroup =
          oldEditorGroups.groups[oldEditorGroups.currentGroupIndex];

        oldEditorGroup.tabs.push({
          editor: createEditor(),
          value: deserialize(content),
          file,
        });

        return { ...oldEditorGroups };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderFile = (dir: Dir) =>
    dir.files.map((file) => (
      <TreeItem
        key={file.path}
        nodeId={file.path}
        label={file.fileName}
        onClick={() => pushTab(file)}
      />
    ));

  const renderDir = (dir: Dir) => (
    <TreeItem key={dir.path} nodeId={dir.path} label={dir.fileName}>
      {dir.dirs.map((subDir) => renderDir(subDir))}
      {renderFile(dir)}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ overflowX: "hidden", overflowY: "auto" }}
      // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderDir(rootDir)}
    </TreeView>
  );
}
