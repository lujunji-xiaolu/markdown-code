import { Paragraph } from "../spec/common-mark";

export const createParagraphElement = (text: string = ""): Paragraph => ({
  type: "paragraph",
  children: [{ text }],
});
