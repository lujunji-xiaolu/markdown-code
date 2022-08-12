import ContextMenuBase from "@/components/context-menu";
import MenuItem from "@/components/menu-item";
import { useMenuState } from "@szhsin/react-menu";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Element, Node, Transforms } from "slate";
import { useSlateStatic } from "slate-react";
import { contextMenuState } from "../../atoms";

const DEFAULT_ANCHOR_POINT = { x: 0, y: 0 };

export default function ContextMenu() {
  const editor = useSlateStatic();
  const [menuProps, toggleMenu] = useMenuState();
  const state = useRecoilValue(contextMenuState);

  let element: Element | null = null;
  if (state) {
    element = Node.get(editor, state.path) as Element;
  }

  const handleClose = () => {
    toggleMenu(false);
  };

  useEffect(() => {
    toggleMenu(state !== null);
  }, [state]);

  const handlePreviewChange = () => {
    if (state && element && element.type === "html") {
      Transforms.setNodes(
        editor,
        { preview: !element.preview },
        {
          at: state.path,
        }
      );
    }
  };

  return (
    <ContextMenuBase
      {...menuProps}
      anchorPoint={state?.anchorPoint ?? DEFAULT_ANCHOR_POINT}
      onClose={handleClose}
    >
      {element && (
        <MenuItem onClick={handlePreviewChange}>
          {element.preview ? "Edit" : "Preview"}
        </MenuItem>
      )}
    </ContextMenuBase>
  );
}
