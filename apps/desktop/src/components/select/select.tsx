import SegoeFluentIcon from "@/components/segoe-fluent-icon/segoe-fluent-icon";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { getFlyoutStyles } from "@/components/flyout";

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  padding: "4px 11px",
  backgroundColor: theme.palette.fill.control.default,
  ...theme.elevation.control,
  ...theme.typography.body2,
  boxShadow: "none",
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.short,
  }),
  "& fieldset": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.fill.control.secondary,
  },
  "&:active": {
    backgroundColor: theme.palette.fill.control.tertiary,
  },
}));

export default function Select(props: Omit<SelectProps, "inputProps">) {
  const { ...other } = props;

  return (
    <StyledSelect
      inputProps={{
        sx: {
          padding: "0px 16px 0px 0px !important",
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: (theme) => ({
            ...getFlyoutStyles(theme),
          }),
        },
      }}
      IconComponent={(props) => <SegoeFluentIcon name="ChevronDownMed" {...props} />}
      {...other}
    />
  );
}
