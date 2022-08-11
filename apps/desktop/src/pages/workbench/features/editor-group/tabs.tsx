import TabBase from "@/components/tab";
import TabsBase from "@/components/tabs";
import { Tab } from "./types";

interface TabsProps {
  tabs: Tab[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: (index: number) => void;
}

export default function Tabs(props: TabsProps) {
  const { tabs, activeIndex, onChange, onClose } = props;

  return (
    <TabsBase>
      {tabs.map((tab, tabIndex) => (
        <TabBase
          key={tab.file.path}
          selected={activeIndex === tabIndex}
          onClick={() => onChange(tabIndex)}
          onClose={() => onClose(tabIndex)}
        >
          {tab.file.fileName}
        </TabBase>
      ))}
    </TabsBase>
  );
}
