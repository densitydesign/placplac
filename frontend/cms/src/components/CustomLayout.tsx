import React from "react";
import { LayoutProps } from "react-admin";
import { Layout } from "./Layout";
import { CustomSidebar } from "./CustomSidebar";
import { CustomAppBar } from "./CustomAppBar";

export const CustomLayout = (props: LayoutProps) => {
  return <Layout {...props} appBar={CustomAppBar} sidebar={CustomSidebar} />;
};
