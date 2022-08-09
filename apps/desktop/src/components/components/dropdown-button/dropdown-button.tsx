import * as React from "react";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@/components/button";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import { styled } from "@mui/material/styles";

const DropdownButtonRoot = styled(Button, {
  name: "WinUIDropdownButton",
  slot: "Root",
})(({ theme }) => ({
  padding: "4px 10px",
  "&:active": {
    "& .WinUIDropdownEndIcon": {
      color: theme.palette.text.tertiary,
    },
  },
  "&.Mui-disabled": {
    "& .WinUIDropdownEndIcon": {
      color: theme.palette.text.disabled,
    },
  },
}));

const EndIcon = styled(SegoeFluentIcon)(({ theme }) => ({
  marginLeft: 8,
  color: theme.palette.text.secondary,
}));

interface DropdownButtonProps
  extends Omit<ButtonProps, "variant" | "endIcon"> {}

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  (props, ref) => {
    const { disabled, children, ...other } = props;

    return (
      <DropdownButtonRoot
        variant="standard"
        disabled={disabled}
        endIcon={
          <EndIcon name="ChevronDownMed" className="WinUIDropdownEndIcon" />
        }
        ref={ref}
        {...other}
      >
        <Typography
          variant="body2"
          component="span"
          textAlign="left"
          sx={{
            minWidth: "76px",
          }}
        >
          {children}
        </Typography>
      </DropdownButtonRoot>
    );
  }
);

export default DropdownButton;
