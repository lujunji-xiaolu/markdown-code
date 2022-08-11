import { FlowContent, Text } from "./common-mark";

export interface YAML extends Text {
  type: "yaml";
}

export type FlowContentFrontmatter = YAML | FlowContent;
