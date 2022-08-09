import Checkbox from "@/components/checkbox";
import { styled } from "@mui/material/styles";
import isBoolean from "lodash/isBoolean";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useFocused, useSlateStatic } from "slate-react";
import { ListItemGfm } from "../spec/github-flavored-markdown";

const ListItemRoot = styled("li")({});

export default function ListItem(props: RenderElementProps) {
  const { checked } = props.element as ListItemGfm;
  const editor = useSlateStatic();
  const focused = useFocused();

  const isTodo = isBoolean(checked);

  return (
    <ListItemRoot
      {...props.attributes}
      sx={{
        ...(isTodo && {
          position: "relative",
          listStyle: "none",
        }),
      }}
    >
      {isTodo && (
        <Checkbox
          contentEditable={false}
          checked={checked}
          sx={{
            position: "absolute",
            left: -22,
            top: 2,
          }}
          onClick={() => {
            if (!focused) {
              ReactEditor.focus(editor);
            }
          }}
          onChange={(event) => {
            const path = ReactEditor.findPath(editor, props.element);
            Transforms.setNodes(
              editor,
              {
                checked: event.target.checked,
              },
              { at: path }
            );
          }}
        />
      )}
      {props.children}
    </ListItemRoot>
  );
}
