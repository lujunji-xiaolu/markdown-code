import { Element, PhrasingContent, StaticPhrasingContent } from "./common-mark";

export interface Footnote extends Element<PhrasingContent> {
  type: "footnote";
}

export type StaticPhrasingContentFootnotes = Footnote | StaticPhrasingContent;
