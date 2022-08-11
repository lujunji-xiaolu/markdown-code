import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { createPortal } from "react-dom";
import { BaseEditor, Editor, Range, Text, Transforms } from "slate";
import { ReactEditor, useFocused, useSlate } from "slate-react";
import CodeIcon from "@mui/icons-material/Code";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

type Format = "emphasis" | "strong" | "inlineCode";

const isFormatActive = (editor: BaseEditor & ReactEditor, format: Format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n.type === format,
    mode: "all",
  });
  return !!match;
};

const toggleFormat = (editor: BaseEditor & ReactEditor, format: Format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { type: isActive ? "text" : format },
    { match: Text.isText, split: true }
  );
};

export default function HoveringToolbar() {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState<Format[]>(() => []);

  const ref = React.useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: Format[]) => {
    setFormats(newFormats);
    newFormats.forEach((format) => toggleFormat(editor, format));
  };

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  React.useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    if (domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
    }
  });

  return createPortal(
    <div>
      <Paper
        ref={ref}
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
          padding: "8px 7px 6px",
          position: "absolute",
          zIndex: 1,
          top: "-10000px",
          left: "-10000px",
          marginTop: "-6px",
          opacity: 0,
          transition: "opacity 0.75s",
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" disabled>
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          onMouseDown={(e) => {
            // prevent toolbar from taking focus away from editor
            e.preventDefault();
          }}
          aria-label="text formatting"
        >
          <ToggleButton value="emphasis" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="strong" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="inlineCode" aria-label="inline code">
            <CodeIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton value="color" aria-label="color" disabled>
            <FormatColorFillIcon />
            <ArrowDropDownIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>,
    document.body
  );
}
