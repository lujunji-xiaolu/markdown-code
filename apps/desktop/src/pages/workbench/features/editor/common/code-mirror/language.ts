import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { xml } from "@codemirror/lang-xml";

export default function language(lang: string) {
  switch (lang) {
    case "css":
      return css;
    case "cpp":
      return cpp;
    case "html":
      return html;
    case "java":
      return java;
    case "javascript":
      return javascript;
    case "json":
      return json;
    case "markdown":
      return markdown;
    case "php":
      return php;
    case "python":
      return python;
    case "rust":
      return rust;
    case "xml":
      return xml;
    default:
      return javascript;
  }
}
