import { anchorPointState, currentTabState } from "@/atoms";
import ContextMenu from "@/components/context-menu";
import MenuItem from "@/components/menu-item";
import { useMenuState } from "@szhsin/react-menu";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Transforms } from "slate";

const DEFAULT_ANCHOR_POINT = { x: 0, y: 0 };

export default function CommandMenu() {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useRecoilState(anchorPointState);
  const currentTab = useRecoilValue(currentTabState);

  const handleClose = () => {
    toggleMenu(false);
  };

  React.useEffect(() => {
    toggleMenu(anchorPoint !== null);
  }, [anchorPoint]);

  const insertHTMLBlock = () => {
    if (currentTab?.editor) {
      Transforms.insertNodes(currentTab.editor, {
        type: "thematicBreak",
        children: [{ text: "" }],
      });
    }
  };

  return (
    <ContextMenu
      {...menuProps}
      anchorPoint={anchorPoint ?? DEFAULT_ANCHOR_POINT}
      onClose={handleClose}
    >
      <MenuItem onClick={insertHTMLBlock}>HTML Block</MenuItem>
    </ContextMenu>
  );
}
