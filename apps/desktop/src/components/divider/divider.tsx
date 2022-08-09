import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

const Divider = styled(MuiDivider, {
  name: "WinUIDivider",
  slot: "Root",
})(({ theme }) => ({
  margin: "4px 0px",
  ...(theme.palette.mode === "light" && {
    borderColor: "rgba(0, 0, 0, 0.0803)",
  }),
  ...(theme.palette.mode === "dark" && {
    borderColor: "rgba(255, 255, 255, 0.0837)",
  }),
}));

export default Divider;
