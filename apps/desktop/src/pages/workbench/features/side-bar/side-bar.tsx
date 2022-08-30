import { activeIndexState } from "@/pages/workbench/atoms/layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useRecoilValue } from "recoil";
import Explorer from "../explorer";
import useDrag from "./use-drag";

export default function SideBar() {
  const activeIndex = useRecoilValue(activeIndexState);

  const { dragBarRef, targetRef } = useDrag(200);

  return (
    <>
      <Card ref={targetRef} className="flex flex-col h-full">
        <CardHeader title="Explorer" />
        <CardContent className="flex-1 overflow-auto">
          <div role="tabpanel" hidden={activeIndex !== 0}>
            <Explorer />
          </div>
        </CardContent>
        {/* <CardHeader>
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
        </SideBarContent> */}
      </Card>
      <div ref={dragBarRef} className="w-1 cursor-e-resize" />
    </>
  );
}
