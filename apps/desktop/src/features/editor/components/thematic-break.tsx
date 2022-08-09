import { RenderElementProps } from "slate-react";

const ThematicBreak = (props: RenderElementProps) => (
  <div {...props.attributes} contentEditable={false}>
    {props.children}
    <hr />
  </div>
);

export default ThematicBreak;
