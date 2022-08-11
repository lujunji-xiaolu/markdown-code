import FilesIcon from "@/components/icons/files";
import ListItemBase from "@/components/list-item";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";
import { styled } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { selectedItemIndexState } from "../atoms/layout";

const ActivityBarRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 48,
});

const ListItem = styled(ListItemBase)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
  margin: 0,
  marginBottom: 4,
});

export default function ActivityBar() {
  const [index, setIndex] = useRecoilState(selectedItemIndexState);

  const handleClick = (newIndex: number) =>
    setIndex(newIndex === index ? -1 : newIndex);

  return (
    <ActivityBarRoot>
      <ListItem selected={index === 0} onClick={() => handleClick(0)}>
        <FilesIcon fontSize="small" />
      </ListItem>
      <ListItem selected={index === 1} onClick={() => handleClick(1)}>
        <SegoeFluentIcon name="Search" sx={{ fontSize: 20 }} />
      </ListItem>
    </ActivityBarRoot>
  );
}
