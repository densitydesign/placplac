import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextShow } from "./TextShow";

export default {
  title: "Blocks/TextShow",
  component: TextShow,
} as ComponentMeta<typeof TextShow>;

const Template: ComponentStory<typeof TextShow> = (args) => (
  <TextShow {...args} />
);

export const Base = Template.bind({});

Base.args = {
  text:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est, egestas nec facilisi justo, maecenas. Aliquet accumsan, posuere amet est. Vitae quis est vitae aliquet et a, aliquam. Donec ut tristique tincidunt sagittis, vitae ultrices nunc sit cursus. Etiam ac bibendum ullamcorper vulputate pellentesque at suspendisse et. Nam sed vitae habitant nisi, nullam a quis varius curabitur. Pellentesque mauris ut tortor amet, aliquet diam. Commodo integer consequat ut sapien sit.  Libero, integer facilisis nibh non orci. Nulla sit tellus tempor mattis sed. Facilisi in pellentesque ame",
};
