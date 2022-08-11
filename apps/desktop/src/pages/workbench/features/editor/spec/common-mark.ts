export interface Element<T> {
  children: T[];
}

export interface Text {
  text: string;
}

export interface Resource {
  url: string;
  title?: string;
}

export interface Association {
  identifier: string;
  label?: string;
}

export interface Reference extends Association {
  referenceType: "shortcut" | "collapsed" | "full";
}

export interface Alternative {
  alt?: string;
}

export interface Void {
  children: [{ text: "" }];
}

export interface Paragraph extends Element<PhrasingContent> {
  type: "paragraph";
}

export interface Heading extends Element<PhrasingContent> {
  type: "heading";
  depth: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ThematicBreak extends Void {
  type: "thematicBreak";
}

export interface Blockquote extends Element<FlowContent> {
  type: "blockquote";
}

export interface List<T extends ListItem> extends Element<T> {
  type: "list";
  ordered: boolean;
  start: number | null;
  spread: boolean;
}

export interface ListItem extends Element<FlowContent> {
  type: "listItem";
  spread?: boolean;
}

export interface HTML extends Void {
  type: "html";
  value: string;
}

export interface Code extends Void {
  type: "code";
  lang?: string;
  meta?: string;
  value: string;
}

export interface Definition extends Association, Resource, Void {
  type: "definition";
}

export interface Emphasis extends Text {
  type: "emphasis";
}

export interface Strong extends Text {
  type: "strong";
}

export interface InlineCode extends Text {
  type: "inlineCode";
}

export interface Break extends Void {
  type: "break";
}

export interface Link extends Resource, Element<StaticPhrasingContent> {
  type: "link";
}

export interface Image extends Resource, Alternative, Void {
  type: "image";
}

export interface LinkReference extends Reference, Element<StaticPhrasingContent> {
  type: "linkReference";
}

export interface ImageReference extends Reference, Alternative, Void {
  type: "imageReference";
}

export type PhrasingContent = Link | LinkReference | StaticPhrasingContent;

export type FlowContent =
  | Blockquote
  | Code
  | Heading
  | HTML
  | List<ListItem>
  | ThematicBreak
  | Definition
  | Paragraph;

export type StaticPhrasingContent =
  | Break
  | Emphasis
  | HTML
  | Image
  | ImageReference
  | InlineCode
  | Strong
  | Text;
