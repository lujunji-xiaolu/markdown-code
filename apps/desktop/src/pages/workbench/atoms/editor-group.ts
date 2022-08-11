import { atom } from "recoil";
import { EditorGroups } from "../features/editor-group";

export const editorGroupsState = atom<EditorGroups>({
  key: "editorGroups",
  default: { groups: [], currentGroupIndex: 0 },
  dangerouslyAllowMutability: true,
});
