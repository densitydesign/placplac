import React from "react";
import { Experiment, LanguageOptions, Layout as MainLayout } from "frontend-components";
import Link from "../components/link";

interface LayoutProps {
  children: React.ReactNode;
  experiments: Experiment[];
  language : LanguageOptions
}
const Layout = (props: LayoutProps) => {
  const { children, experiments, language } = props;
  return (
    <MainLayout language={language} experiments={experiments} basePath="/" linkComponent={Link}>
      {children}
    </MainLayout>
  );
};
export default Layout;
