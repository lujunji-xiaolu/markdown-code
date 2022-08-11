import { styled } from "@mui/material/styles";

const CardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  ...(theme.palette.mode === "light" && {
    borderBottom: "1px solid rgba(0, 0, 0, 0.0578)",
  }),
  ...(theme.palette.mode === "dark" && {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  }),
}));

export default CardHeader;
