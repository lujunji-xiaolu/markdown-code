import { Menu as InternalMenu } from "@szhsin/react-menu";
import { styled } from "@mui/material/styles";
import { getFlyoutStyles } from "@/components/flyout";

const Menu = styled(InternalMenu, {
  name: "WinUIMenu",
  slot: "Root",
})(({ theme }) => ({
  "& .szh-menu": {
    ...getFlyoutStyles(theme),
    margin: 0,
    listStyle: "none",
    boxSizing: "border-box",
    width: "max-content",
    zIndex: 100,
    userSelect: "none",
    color: "#212529",
    borderRadius: "0.25rem",
    minWidth: "10rem",
    padding: "0.5rem 0",
    "&:focus": {
      outline: "none",
    },
  },
}));

export default Menu;
