import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useMenuState } from "@szhsin/react-menu";
import { Layout } from "@/features/storybook";
import ContextMenu from "@/components/context-menu";
import SubMenu from "@/components/sub-menu";
import MenuItem from "@/components/menu-item";
import Divider from "@/components/divider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WinUI/ContextMenu",
  component: ContextMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ContextMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContextMenu> = (args) => {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = React.useState({ x: 0, y: 0 });

  return (
    <Layout>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setAnchorPoint({ x: e.clientX, y: e.clientY });
          toggleMenu(true);
        }}
      >
        Right click to open context menu
        <ContextMenu {...menuProps} anchorPoint={anchorPoint} onClose={() => toggleMenu(false)}>
          <MenuItem type="checkbox">Text</MenuItem>
          <Divider />
          <MenuItem type="checkbox">Text</MenuItem>
          <MenuItem type="radio" checked>
            Text
          </MenuItem>
          <Divider />
          <MenuItem type="checkbox">Text</MenuItem>
          <MenuItem type="checkbox" checked>
            Text
          </MenuItem>
          <MenuItem type="checkbox" checked>
            Text
          </MenuItem>
          {/* <Divider />
          <SubMenu label="Text">
            <MenuItem>Text</MenuItem>
            <MenuItem>Text</MenuItem>
            <MenuItem>Text</MenuItem>
          </SubMenu>
          <MenuItem>Text</MenuItem>
          <Divider />
          <MenuItem>Text</MenuItem>
          <MenuItem>Text</MenuItem>
          <MenuItem>Text</MenuItem> */}
        </ContextMenu>
      </div>
    </Layout>
  );
};

export const Standard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Standard.args = {};
