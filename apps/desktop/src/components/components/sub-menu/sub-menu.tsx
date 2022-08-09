import { SubMenu as InternalSubMenu } from "@szhsin/react-menu";
import { styled } from "@mui/material/styles";

const SubMenu = styled(InternalSubMenu, {
  name: "WinUISubMenu",
  slot: "Root",
})(({ theme }) => ({
  "& > .szh-menu__item": {
    position: "relative",
    boxSizing: "border-box",
    height: 34,
    width: 268,
    padding: "7px 10px",
    margin: "3px 5px",
    borderRadius: theme.shape.borderRadius,
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    cursor: "pointer",
    listStyle: "none",
    userSelect: "none",
    transition: theme.transitions.create(["background-color", "color"], {
      duration: theme.transitions.duration.short,
    }),
    "&.szh-menu__item--hover": {
      backgroundColor: theme.palette.fill.subtle.secondary,
    },
    "&:focus": {
      outline: "none",
    },
    "&::after": {
      content: '"\\e76c"',
      fontFamily: "Segoe Fluent Icons",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "12px",
      position: "absolute",
      top: "calc(50% - 6px)",
      right: "10px",
    },
  },
}));

export default SubMenu;
