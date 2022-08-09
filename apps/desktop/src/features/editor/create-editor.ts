import { createEditor as createSlateEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import withMarkdown from "./with-markdown";

export const createEditor = () => withMarkdown(withReact(withHistory(createSlateEditor())));
