import React from "react";
import { Experiment, Layout as MainLayout } from "frontend-components";
import Link from "../components/link";

interface LayoutProps {
  children: React.ReactNode;
  experiments: Experiment[];
}
const Layout = (props: LayoutProps) => {
  const { children, experiments } = props;
  return (
    <MainLayout experiments={experiments} basePath="/" linkComponent={Link}>
      {children}
    </MainLayout>
  );
};
export default Layout;
