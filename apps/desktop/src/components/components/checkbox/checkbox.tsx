import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import * as React from "react";

const Icon = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 20,
  height: 20,
  border: "1px solid",
  borderColor: theme.stroke.controlStrong.default,
  borderRadius: 4,
  backgroundColor: theme.palette.fill.controlAlt.secondary,
}));

const CheckboxRoot = styled(MuiCheckbox)(({ theme }) => ({
  padding: 0,
}));

const Checkbox = React.forwardRef<
  HTMLButtonElement,
  Omit<CheckboxProps, "disableRipple" | "icon" | "checkedIcon">
>((props, ref) => {
  const { ...other } = props;

  return (
    <CheckboxRoot
      disableRipple
      icon={<Icon />}
      checkedIcon={
        <Icon
          sx={(theme) => ({
            backgroundColor: theme.palette.fill.accent.tertiary,
            borderColor: theme.palette.fill.accent.tertiary,
            color: theme.palette.textOnAccent.primary,
          })}
        >
          <SegoeFluentIcon name="AcceptMedium" />
        </Icon>
      }
      ref={ref}
      {...other}
    />
  );
});

export default Checkbox;
