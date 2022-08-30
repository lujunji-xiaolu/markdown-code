import { atom } from "recoil";
import { Dir } from "./types";

export const anchorPointState = atom<{ x: number; y: number } | null>({
  key: "explorer-anchorPoint",
  default: null,
});

export const activeTreeItemState = atom<Dir | null>({
  key: "explorer-activeTreeItem",
  default: null,
});

export const showNewFileInputState = atom({
  key: "explorer-showNewFileInput",
  default: false,
});
