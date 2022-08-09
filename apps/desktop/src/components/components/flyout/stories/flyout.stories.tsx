import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Layout } from "@/features/storybook";
import Flyout from "@/components/flyout";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WinUI/Flyout",
  component: Flyout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Flyout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Flyout> = (args) => (
  <Layout>
    <Flyout {...args} />
  </Layout>
);

export const Acrylic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Acrylic.args = {
  sx: {
    width: "100%",
    height: 200,
  },
};
