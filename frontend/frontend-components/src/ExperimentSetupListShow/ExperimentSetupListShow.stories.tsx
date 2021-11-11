import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExperimentSetupListShow } from "./ExperimentSetupListShow";

export default {
  title: "Blocks/ExperimentSetupListShow",
  component: ExperimentSetupListShow,
} as ComponentMeta<typeof ExperimentSetupListShow>;

const Template: ComponentStory<typeof ExperimentSetupListShow> = (args) => (
  <ExperimentSetupListShow {...args} />
);

export const Base = Template.bind({});

Base.args = {
  title: "INFRASTRUCTURE",
  subtitle: "{How to setup your device and browser}",
  list: [
    "You will use Youtube always from the same computer.",
    "Navigate in a clean browser (we use Brave) in Incognito mode.",
  ],
};
