import TreeItemBase from "@mui/lab/TreeItem";
import { useContext, useEffect } from "react";
// @ts-ignore
import TreeViewContext from "@mui/lab/TreeView/TreeViewContext";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeTreeItemState,
  anchorPointState,
  showNewFileInputState,
} from "./atoms";
import NewFile from "./new-file";
import { Dir } from "./types";

interface TreeItemProps {
  dir: Dir;
}

export default function TreeItem(props: TreeItemProps) {
  const { dir } = props;

  const {
    icons: contextIcons = {},
    focus,
    isExpanded,
    isFocused,
    isSelected,
    isDisabled,
    multiSelect,
    disabledItemsFocusable,
    mapFirstChar,
    unMapFirstChar,
    registerNode,
    unregisterNode,
    treeId,
    toggleExpansion,
  } = useContext(TreeViewContext);

  const [showInput, setShowInput] = useRecoilState(showNewFileInputState);
  const [activeTreeItem, setActiveItem] = useRecoilState(activeTreeItemState);

  const setAnchorPoint = useSetRecoilState(anchorPointState);

  const handleDirContextMenu: React.MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    event.preventDefault();
    setAnchorPoint({ x: event.clientX, y: event.clientY });
    setActiveItem(dir);
  };

  const handleFileContextMenu: React.MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <TreeItemBase
      nodeId={dir.path}
      label={dir.fileName}
      onContextMenu={handleDirContextMenu}
    >
      {isExpanded &&
        dir.dirs.map((subDir) => (
          <TreeItem key={subDir.path} dir={subDir}></TreeItem>
        ))}
      {showInput && activeTreeItem?.path === dir.path && (
        <NewFile dir={dir}></NewFile>
      )}
      {isExpanded &&
        dir.files.map((file) => (
          <TreeItemBase
            key={file.path}
            nodeId={file.path}
            label={file.fileName}
            onContextMenu={handleFileContextMenu}
            // onClick={() => pushTab(file)}
          />
        ))}
    </TreeItemBase>
  );
}
