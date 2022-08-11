import { currentTabState, editorGroupsState } from "@/atoms";
import Card from "@/components/card";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import Tab from "@/components/tab";
import Tabs from "@/components/tabs";
import CommandMenu from "@/features/command-menu";
import Editor from "@/features/editor";
import Explorer from "@/features/explorer";
import MenuBar from "@/features/menu-bar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedItemIndexState } from "./atoms/layout";
import ActivityBar from "./features/activity-bar";

const FlexBox = styled("div")({
  display: "flex",
});

const SideBar = styled(Card)({
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  width: 230,
});

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

const SideBarContent = styled("div")({
  flex: 1,
  padding: 12,
  overflowY: "auto",
});

const DragBar = styled("div")({
  width: 4,
  cursor: "e-resize",
});

const StatusBar = styled("div")({
  height: 30,
});

const Breadcrumb = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  cursor: "pointer",
  transition: theme.transitions.create(["color"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    color: theme.palette.text.secondary,
  },
  "&:active": {
    color: theme.palette.text.tertiary,
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
  },
}));

function Workbench() {
  const selectedIndex = useRecoilValue(selectedItemIndexState);

  const currentTab = useRecoilValue(currentTabState);

  const targetRef = React.useRef<HTMLDivElement>(null);
  const dragBarRef = React.useRef<HTMLDivElement>(null);
  const startPosition = React.useRef(0);
  const startWidth = React.useRef(0);
  React.useEffect(() => {
    const dragBar = dragBarRef.current;
    const target = targetRef.current;
    if (dragBar && target) {
      const handleStopDrag = () => {
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleDrag);
        document.body.style.cursor = "auto";
      };
      const handleDrag = (ev: MouseEvent) => {
        const movement = ev.clientX - startPosition.current;
        const endWidth = startWidth.current + movement;
        target.style.width = `${endWidth}px`;
      };
      const handleBeginDrag = (ev: MouseEvent) => {
        ev.preventDefault();
        startPosition.current = ev.clientX;
        startWidth.current = target.offsetWidth;
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleStopDrag);
        document.body.style.cursor = "e-resize";
      };
      dragBar.addEventListener("mousedown", handleBeginDrag);
      return () => {
        dragBar.removeEventListener("mousedown", handleBeginDrag);
      };
    }
  }, []);

  const [editorGroups, setEditorGroups] = useRecoilState(editorGroupsState);

  const setCurrentTabIndex = (editorGroupIndex: number, tabIndex: number) => {
    const editorGroup = editorGroups.groups[editorGroupIndex];
    editorGroup.currentTabIndex = tabIndex;
    setEditorGroups({ ...editorGroups });
  };

  const handleCloseTab = (editorGroupIndex: number, tabIndex: number) => {
    editorGroups.groups[editorGroupIndex].tabs.splice(tabIndex, 1);
    if (editorGroups.groups[editorGroupIndex].tabs.length === 0) {
      editorGroups.groups.splice(editorGroupIndex, 1);
    }
    setEditorGroups({ ...editorGroups });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <MenuBar />
      <FlexBox
        sx={{ height: "calc(100vh - 78px)", flex: 1, paddingRight: "4px" }}
      >
        <ActivityBar></ActivityBar>
        <SideBar ref={targetRef}>
          <CardHeader>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Explorer
            </Typography>
            <SegoeFluentIcon name="More" />
          </CardHeader>
          <SideBarContent>
            <FlexBox
              role="tabpanel"
              hidden={selectedIndex !== 0}
              sx={{ flexDirection: "column" }}
            >
              <Explorer />
            </FlexBox>
          </SideBarContent>
        </SideBar>
        <DragBar ref={dragBarRef} />
        {editorGroups.groups.map((editorGroup, index) => (
          <FlexBox
            key={`editorGroup-${index}`}
            sx={{ flex: 1, flexDirection: "column", overflowX: "auto" }}
          >
            <Tabs>
              {editorGroup.tabs.map((tab, tabIndex) => (
                <Tab
                  key={`tab-${tabIndex}`}
                  selected={editorGroup.currentTabIndex === tabIndex}
                  onClick={() => setCurrentTabIndex(index, tabIndex)}
                  onClose={() => handleCloseTab(index, tabIndex)}
                >
                  {tab.file.fileName}
                </Tab>
              ))}
            </Tabs>
            <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <CardHeader>
                <Breadcrumbs
                  separator={
                    <SegoeFluentIcon
                      name="ChevronRightMed"
                      sx={{ fontSize: 16 }}
                    />
                  }
                  aria-label="breadcrumb"
                >
                  {currentTab?.file.components.map((component, index) => (
                    <Breadcrumb key={`${component}-${index}`} variant="body2">
                      {component}
                    </Breadcrumb>
                  ))}
                </Breadcrumbs>
              </CardHeader>
              {editorGroup.tabs.map((tab, tabIndex) => (
                <FlexBox
                  key={`tab-${tabIndex}`}
                  role="tabpanel"
                  hidden={editorGroup.currentTabIndex === tabIndex}
                  sx={{ flex: 1, width: "100%" }}
                >
                  <Editor editor={tab.editor} value={tab.value} />
                </FlexBox>
              ))}
            </Card>
          </FlexBox>
        ))}
        <CommandMenu />
      </FlexBox>
      <StatusBar></StatusBar>
    </Box>
  );
}

export default Workbench;
