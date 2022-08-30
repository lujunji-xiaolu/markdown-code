import Icon from "@/components/icon";
import { activeIndexState } from "@/pages/workbench/atoms/layout";
import ListItem from "@mui/material/ListItem";
import { useRecoilState } from "recoil";

export default function ActivityBar() {
  const [index, setIndex] = useRecoilState(activeIndexState);

  const handleClick = (newIndex: number) =>
    setIndex(newIndex === index ? -1 : newIndex);

  return (
    <div className="flex flex-col items-center w-12">
      <ListItem selected={index === 0} onClick={() => handleClick(0)}>
        <Icon name="files" />
      </ListItem>
      <ListItem selected={index === 1} onClick={() => handleClick(1)}>
        <Icon name="search" />
      </ListItem>
    </div>
  );
}
