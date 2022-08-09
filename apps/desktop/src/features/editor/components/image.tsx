import { styled } from "@mui/material/styles";
import { RenderElementProps } from "slate-react";
import { ImageElement } from "../editor";

const StyledImage = styled("img")({});

export default function Image(props: RenderElementProps) {
  const { element, attributes, children } = props;
  const { url, title, alt } = element as ImageElement;

  return (
    <span contentEditable={false} {...attributes}>
      <StyledImage src={url} title={title ?? undefined} alt={alt} />
      {children}
    </span>
  );
}
