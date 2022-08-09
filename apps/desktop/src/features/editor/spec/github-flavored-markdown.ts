import {
  Association,
  Element,
  FlowContent,
  ListItem,
  PhrasingContent,
  StaticPhrasingContent,
  Void,
} from "./common-mark";

export interface ListItemGfm extends ListItem {
  checked?: boolean;
}

export interface FootnoteDefinition extends Association, Element<FlowContentGfm> {
  type: "footnoteDefinition";
}

export interface FootnoteReference extends Association, Void {
  type: "footnoteReference";
}

export interface Table extends Element<TableRow> {
  type: "table";
  align: ("left" | "center" | "right" | null)[];
}

export interface TableRow extends Element<TableCell> {
  type: "tableRow";
}

export interface TableCell extends Element<PhrasingContent> {
  type: "tableCell";
}

export interface Delete extends Text {
  type: "delete";
}

export type FlowContentGfm = FootnoteDefinition | Table | FlowContent;

export type StaticPhrasingContentGfm = FootnoteReference | Delete | StaticPhrasingContent;
