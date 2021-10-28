import React from "react";
import { Layout as MainLayout } from "frontend-components";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

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
