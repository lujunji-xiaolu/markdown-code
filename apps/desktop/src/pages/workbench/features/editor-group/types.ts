import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { File } from "../explorer";

export interface Tab {
  editor: BaseEditor & ReactEditor;
  value: Descendant[];
  file: File;
}

export interface EditorGroup {
  tabs: Tab[];
  activeIndex: number;
}

export interface EditorGroups {
  groups: EditorGroup[];
  currentGroupIndex: number;
}
