import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Layout } from "@/features/storybook";
import ToggleButton from "@/components/toggle-button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WinUI/ToggleButton",
  component: ToggleButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ToggleButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToggleButton> = (args) => {
  const [selected, setSelected] = React.useState(true);
  return (
    <Layout>
      <ToggleButton
        {...args}
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    </Layout>
  );
};

export const Standard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Standard.args = {
  disabled: false,
  children: "Text",
};
