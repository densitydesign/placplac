import React from 'react';
import {
  Experiment,
  LanguageOptions,
  Footer as FooterType,
  Project,
} from '@algocount/shared/types';
import { Layout as MainLayout } from '@algocount/ui-site';
import Link from '../components/link';

interface LayoutProps {
  children: React.ReactNode;
  project: Project;
}
const Layout = (props: LayoutProps) => {
  const { children, project } = props;
  return (
    <MainLayout project={project} basePath="/" linkComponent={Link}>
      {children}
    </MainLayout>
  );
};
export default Layout;
