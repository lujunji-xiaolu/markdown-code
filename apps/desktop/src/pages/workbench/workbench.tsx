// import CommandMenu from "@/features/command-menu";
import MenuBar from "@/features/menu-bar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useRecoilValue } from "recoil";
import { editorGroupsState } from "./atoms/editor-group";
import ActivityBar from "./features/activity-bar";
import EditorGroup from "./features/editor-group";
import SideBar from "./features/side-bar";

const StatusBar = styled("div")({
  height: 30,
});

function Workbench() {
  const editorGroups = useRecoilValue(editorGroupsState);

  return (
    <Box sx={{ height: "100vh" }}>
      <MenuBar />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 78px)",
          flex: 1,
          paddingRight: "4px",
        }}
      >
        <ActivityBar></ActivityBar>
        <SideBar></SideBar>
        {editorGroups.groups.map((editorGroup, index) => (
          <EditorGroup
            key={`editor-group-${index}`}
            editorGroup={editorGroup}
          ></EditorGroup>
        ))}
        {/* <CommandMenu /> */}
      </Box>
      <StatusBar></StatusBar>
    </Box>
  );
}

export default Workbench;
