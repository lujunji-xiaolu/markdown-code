import Card from "@/components/card";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import CardHeader from "@/pages/workbench/components/card-header";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useUpdate from "react-use/lib/useUpdate";
import Editor from "../editor";
import Tabs from "./tabs";
import { EditorGroup as IEditorGroup } from "./types";

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

interface EditorGroupProps {
  editorGroup: IEditorGroup;
}

export default function EditorGroup(props: EditorGroupProps) {
  const { editorGroup } = props;
  const { tabs, activeIndex } = editorGroup;
  const activeTab = tabs[activeIndex];

  const update = useUpdate();

  if (tabs.length === 0) return null;

  const updateActiveIndex = (tabIndex: number) => {
    editorGroup.activeIndex = tabIndex;
    update();
  };

  const handleCloseTab = (tabIndex: number) => {
    tabs.splice(tabIndex, 1);
    update();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        overflowX: "auto",
      }}
    >
      <Tabs
        tabs={tabs}
        activeIndex={activeIndex}
        onChange={updateActiveIndex}
        onClose={handleCloseTab}
      ></Tabs>
      <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardHeader>
          <Breadcrumbs
            separator={
              <SegoeFluentIcon name="ChevronRightMed" sx={{ fontSize: 16 }} />
            }
            aria-label="breadcrumb"
          >
            {activeTab?.file.components.map((component, index) => (
              <Breadcrumb key={`${component}-${index}`} variant="body2">
                {component}
              </Breadcrumb>
            ))}
          </Breadcrumbs>
        </CardHeader>
        {editorGroup.tabs.map((tab, tabIndex) => (
          <Box
            key={tab.file.path}
            role="tabpanel"
            hidden={activeIndex === tabIndex}
            sx={{ display: "flex", flex: 1, width: "100%" }}
          >
            <Editor editor={tab.editor} value={tab.value} />
          </Box>
        ))}
      </Card>
    </Box>
  );
}
