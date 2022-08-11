import { styled } from "@mui/material/styles";
import { RenderElementProps } from "slate-react";
import { List as IList, ListItem } from "../spec/common-mark";

const UnOrderedListRoot = styled("ul")({});

const OrderedListRoot = styled("ol")({});

export default function List(props: RenderElementProps) {
  const { element, attributes, children } = props;
  const { ordered, start } = element as IList<ListItem>;

  if (ordered) {
    return (
      <OrderedListRoot start={start ?? undefined} {...attributes}>
        {children}
      </OrderedListRoot>
    );
  }
  return <UnOrderedListRoot {...attributes}>{children}</UnOrderedListRoot>;
}
