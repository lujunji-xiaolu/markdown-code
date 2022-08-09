import { editorGroupsState, rootDirState } from "@/atoms";
import { createEditor, deserialize } from "@/features/editor";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeView } from "@mui/lab";
import TreeItem from "@mui/lab/TreeItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import OpenFolder from "./open-folder";
import { Dir, File } from "./types";

export default function Explorer() {
  const rootDir = useRecoilValue(rootDirState);
  const setEditorGroups = useSetRecoilState(editorGroupsState);

  if (rootDir === null) return <OpenFolder />;

  const pushTab = (file: File) => {
    setEditorGroups((oldEditorGroups) => {
      if (oldEditorGroups.groups[oldEditorGroups.currentGroupIndex] === undefined) {
        oldEditorGroups.groups[oldEditorGroups.currentGroupIndex] = {
          tabs: [],
          currentTabIndex: 0,
        };
      }

      const oldEditorGroup = oldEditorGroups.groups[oldEditorGroups.currentGroupIndex];

      oldEditorGroup.tabs.push({
        editor: createEditor(),
        value: deserialize(""),
        file,
      });

      return { ...oldEditorGroups };
    });
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
      // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {renderDir(rootDir)}
    </TreeView>
  );
}
