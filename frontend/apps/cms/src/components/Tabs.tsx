import { TabbedFormTabs, TabbedFormTabsProps } from 'react-admin';
import React from 'react';

export const Tabs = (props: TabbedFormTabsProps) => {
  return <TabbedFormTabs {...props} variant="scrollable" />;
};
