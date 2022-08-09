import { MenuButton } from "@szhsin/react-menu";
import Menu from "@/components/menu";
import MenuItem from "@/components/menu-item";
import { styled } from "@mui/material/styles";

const MenuBarRoot = styled("div", {
  name: "MenuBar",
  slot: "Root",
})({ display: "flex", height: 48, padding: 4 });

const MenuBarButton = styled(MenuButton, {
  name: "MenuBarButton",
  slot: "Root",
})(({ theme }) => ({
  padding: "5px 10px",
  margin: 5,
  border: "none",
  borderRadius: 4,
  backgroundColor: "transparent",
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  cursor: "default",
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    backgroundColor: theme.palette.fill.subtle.secondary,
  },
  "&:active": {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.fill.subtle.tertiary,
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
  },
}));

export default function MenuBar() {
  return (
    <MenuBarRoot>
      <Menu menuButton={<MenuBarButton>File</MenuBarButton>}>
        <MenuItem hintText="Ctrl+Alt+Windows+N">New File...</MenuItem>
      </Menu>
      <Menu menuButton={<MenuBarButton>Edit</MenuBarButton>}>
        <MenuItem hintText="Ctrl+Z">Undo</MenuItem>
      </Menu>

      <MenuBarButton>Selection</MenuBarButton>
      <MenuBarButton>View</MenuBarButton>
      <MenuBarButton>Go</MenuBarButton>
      <MenuBarButton>Run</MenuBarButton>
      <MenuBarButton>Terminal</MenuBarButton>
      <MenuBarButton>Help</MenuBarButton>
    </MenuBarRoot>
  );
}
