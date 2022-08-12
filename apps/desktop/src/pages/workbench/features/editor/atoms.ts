import { atom } from "recoil";
import { Path } from "slate";

export const contextMenuState = atom<{
  anchorPoint: { x: number; y: number };
  path: Path;
} | null>({
  key: "contextMenu",
  default: null,
});
