import { Dir, File } from "@/features/explorer";
import { atom, selector } from "recoil";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

export interface Tab {
  editor: BaseEditor & ReactEditor;
  value: Descendant[];
  file: File;
}

export interface EditorGroup {
  tabs: Tab[];
  currentTabIndex: number;
}

export interface EditorGroups {
  groups: EditorGroup[];
  currentGroupIndex: number;
}

export const editorGroupsState = atom<EditorGroups>({
  key: "editorGroups",
  default: { groups: [], currentGroupIndex: 0 },
  dangerouslyAllowMutability: true,
});

export const currentTabState = selector({
  key: "currentTab",
  get: ({ get }) => {
    const editorGroups = get(editorGroupsState);
    const editorGroup = editorGroups.groups[editorGroups.currentGroupIndex];
    if (editorGroup !== undefined) {
      const tab = editorGroup.tabs[editorGroup.currentTabIndex] ?? null;
      return tab;
    }
    return null;
  },
  dangerouslyAllowMutability: true,
});

export const anchorPointState = atom<{ x: number; y: number } | null>({
  key: "anchorPoint",
  default: null,
});

export const rootDirState = atom<Dir | null>({
  key: "rootDir",
  default: null,
});
