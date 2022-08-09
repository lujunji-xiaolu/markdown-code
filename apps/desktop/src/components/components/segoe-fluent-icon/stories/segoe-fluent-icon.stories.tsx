import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Layout } from "@/features/storybook";
import SegoeFluentIcon from "@/components/segoe-fluent-icon";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WinUI/SegoeFluentIcon",
  component: SegoeFluentIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SegoeFluentIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SegoeFluentIcon> = (args) => (
  <Layout>
    <SegoeFluentIcon {...args} />
  </Layout>
);

export const ChevronDownMed = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ChevronDownMed.args = {
  name: "ChevronDownMed",
};
