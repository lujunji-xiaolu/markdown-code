import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Layout } from "@/features/storybook";
import LinkButton from "@/components/link-button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "WinUI/LinkButton",
  component: LinkButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LinkButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LinkButton> = (args) => {
  return (
    <Layout>
      <LinkButton {...args} />
    </Layout>
  );
};

export const Standard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Standard.args = {
  disabled: false,
  children: "Text",
};
