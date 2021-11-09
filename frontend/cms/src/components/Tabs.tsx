import { TabbedFormTabs, TabbedFormTabsProps } from "ra-ui-materialui";
import React from "react";

export const Tabs = (props: TabbedFormTabsProps) => {
  return <TabbedFormTabs {...props} variant="scrollable" />;
};
