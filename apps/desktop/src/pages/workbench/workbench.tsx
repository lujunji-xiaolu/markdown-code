// import CommandMenu from "@/features/command-menu";
import MenuBar from "@/pages/workbench/features/menu-bar";
import { useRecoilValue } from "recoil";
import { editorGroupsState } from "./atoms/editor-group";
import ActivityBar from "./features/activity-bar";
import SideBar from "./features/side-bar";

function Workbench() {
  const editorGroups = useRecoilValue(editorGroupsState);

  return (
    <div className="flex flex-col h-full">
      <MenuBar />
      <div className="flex" style={{ height: "calc(100% - 80px)" }}>
        <ActivityBar />
        <SideBar />
      </div>
      {/* <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 78px)",
          flex: 1,
          paddingRight: "4px",
        }}
      >
        
       
        {editorGroups.groups.map((editorGroup, index) => (
          <EditorGroup
            key={`editor-group-${index}`}
            editorGroup={editorGroup}
          ></EditorGroup>
        ))}
      </Box> */}
      <div className="h-8" />
    </div>
  );
}

export default Workbench;
