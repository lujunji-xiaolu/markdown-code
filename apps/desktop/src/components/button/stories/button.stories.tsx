import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Layout } from "@/features/storybook";
import Button from "@/components/button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WinUI/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Layout>
    <Button {...args} />
  </Layout>
);

export const Contained = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Contained.args = {
  variant: "accent",
  disabled: false,
  children: "Text",
};

export const Standard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Standard.args = {
  variant: "standard",
  disabled: false,
  children: "Text",
};
