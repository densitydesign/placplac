import React from "react";
import { Layout as MainLayout } from "frontend-components";
import Link from "../components/link";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <MainLayout basePath="/" linkComponent={Link}>
      {children}
    </MainLayout>
  );
};
export default Layout;
