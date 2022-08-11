import Card from "@/components/card";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import { selectedItemIndexState } from "@/pages/workbench/atoms/layout";
import CardHeader from "@/pages/workbench/components/card-header";
import Explorer from "@/pages/workbench/features/explorer";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import useDrag from "./use-drag";

const SideBarRoot = styled(Card)({
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  width: 230,
});

const SideBarContent = styled("div")({
  flex: 1,
  padding: 12,
  overflowY: "auto",
});

const DragBar = styled("div")({
  width: 4,
  cursor: "e-resize",
});

export default function SideBar() {
  const selectedIndex = useRecoilValue(selectedItemIndexState);

  const { dragBarRef, targetRef } = useDrag(200);

  return (
    <>
      <SideBarRoot ref={targetRef}>
        <CardHeader>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Explorer
          </Typography>
          <SegoeFluentIcon name="More" />
        </CardHeader>
        <SideBarContent>
          <Box
            role="tabpanel"
            hidden={selectedIndex !== 0}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Explorer />
          </Box>
        </SideBarContent>
      </SideBarRoot>
      <DragBar ref={dragBarRef} />
    </>
  );
}
