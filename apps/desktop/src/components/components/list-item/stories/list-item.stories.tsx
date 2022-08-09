import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Box from "@mui/material/Box";
import { Layout } from "@/features/storybook";
import ListItem from "@/components/list-item";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WinUI/ListItem",
  component: ListItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ListItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListItem> = (args) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <ListItem {...args} />
        <Box>
          <ListItem selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
            Text
          </ListItem>
          <ListItem selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
            Text
          </ListItem>
          <ListItem selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
            Text
          </ListItem>
          <ListItem selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
            Text
          </ListItem>
        </Box>
      </Box>
    </Layout>
  );
};

export const Standard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Standard.args = {
  disabled: false,
  selected: false,
  children: "Text",
};
