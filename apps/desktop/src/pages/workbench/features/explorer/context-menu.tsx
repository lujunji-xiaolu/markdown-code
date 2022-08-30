import ContextMenuBase from "@/components/context-menu";
import MenuItem from "@/components/menu-item";
import { useMenuState } from "@szhsin/react-menu";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { anchorPointState, showNewFileInputState } from "./atoms";

const DEFAULT_ANCHOR_POINT = { x: 0, y: 0 };

export default function ContextMenu() {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useRecoilState(anchorPointState);
  const setShowInput = useSetRecoilState(showNewFileInputState);

  const handleClose = () => {
    toggleMenu(false);
  };

  useEffect(() => {
    toggleMenu(anchorPoint !== null);
  }, [anchorPoint]);

  return (
    <ContextMenuBase
      {...menuProps}
      portal
      anchorPoint={anchorPoint ?? DEFAULT_ANCHOR_POINT}
      onClose={handleClose}
    >
      <MenuItem onClick={() => setShowInput(true)}>New File</MenuItem>
    </ContextMenuBase>
  );
}
