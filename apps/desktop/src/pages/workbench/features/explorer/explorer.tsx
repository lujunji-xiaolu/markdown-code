// import { createEditor, deserialize } from "@/pages/workbench/features/editor";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { appWindow } from "@tauri-apps/api/window";
import * as React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editorGroupsState } from "../../atoms/editor-group";
import { rootDirState } from "../../atoms/explorer";
import OpenFolder from "./open-folder";
import { Dir } from "./types";
import { findParentDir } from "./utils";

export default function Explorer() {
  const [rootDir, setRootDir] = useRecoilState(rootDirState);
  const setEditorGroups = useSetRecoilState(editorGroupsState);

  React.useEffect(() => {
    let rootDir: Dir | null = null;
    let count = 0;
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
          id: count++,
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
            id: count++,
            path,
            fileName: file_name,
            components,
          });
        } else {
          parentDir.dirs.push({
            id: count++,
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

  // const pushTab = async (file: File) => {
  //   try {
  //     const content = await invoke<string>("read_to_string", {
  //       path: file.path,
  //     });
  //     setEditorGroups((oldEditorGroups) => {
  //       if (
  //         oldEditorGroups.groups[oldEditorGroups.currentGroupIndex] ===
  //         undefined
  //       ) {
  //         oldEditorGroups.groups[oldEditorGroups.currentGroupIndex] = {
  //           tabs: [],
  //           activeIndex: 0,
  //         };
  //       }

  //       const oldEditorGroup =
  //         oldEditorGroups.groups[oldEditorGroups.currentGroupIndex];

  //       oldEditorGroup.tabs.push({
  //         editor: createEditor(),
  //         value: deserialize(content),
  //         file,
  //       });

  //       return { ...oldEditorGroups };
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const renderDir = (dir: Dir) => (
    <TreeItem key={dir.path} nodeId={dir.path} label={dir.fileName}>
      {dir.dirs.map((subDir) => renderDir(subDir))}
      {dir.files.map((subFile) => (
        <TreeItem
          key={subFile.path}
          nodeId={subFile.path}
          label={subFile.fileName}
        />
      ))}
    </TreeItem>
  );

  return (
    <div className="flex flex-col">
      <div>
        <span className="segoe-fluent-icons ChevronRightMed"></span>
        <span className="cursor-pointer select-none uppercase">
          open editors
        </span>
      </div>
      <div>
        <span>{rootDir.fileName}</span>
      </div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderDir(rootDir)}
      </TreeView>
      {/* <ContextMenu></ContextMenu> */}
    </div>
  );
}
