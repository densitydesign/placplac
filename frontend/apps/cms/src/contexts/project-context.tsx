import { GlossaryTerm, Reference } from '@algocount/shared/types';
import React, { useContext, useMemo } from 'react';
import { Identifier, useGetList, useGetOne } from 'react-admin';
import { Project, ProjectAnchor } from '../types';

interface IProjectContext {
  glossaryTerms: GlossaryTerm[];
  references: Reference[];
  project?: Identifier;
  anchors: { text: string; items: { text: string; value: string }[] }[];
}

const defaultState = {
  glossaryTerms: [],
  references: [],
  project: undefined,
  anchors: [],
};

const ProjectContext = React.createContext<IProjectContext>(defaultState);

export const ProjectContextProvider: React.FC<{ project: Identifier }> = (
  props
) => {
  const { children, project } = props;
  const { data: projectObject } = useGetOne<Project>('projects', {
    id: project,
  });
  const { data: unformattedGlossaryItems, isLoading: loadingG } =
    useGetList<GlossaryTerm>(
      'glossary-terms',
      { filter: { project } },
      {
        enabled: !!project,
        initialData: { data: [] as GlossaryTerm[] },
      }
    );
  const { data: unformattedReferences, isLoading: loadingR } =
    useGetList<Reference>(
      'references',
      { filter: { project: project } },
      {
        enabled: !!project,
        initialData: { data: [] as Reference[] },
      }
    );
  const anchors = useMemo(() => {
    if (projectObject) {
      return projectObject.anchors.map((anchor) => ({
        text: anchor.title,
        items: anchor.anchors,
      }));
    } else return [];
  }, [projectObject]);
  return unformattedGlossaryItems && unformattedReferences && projectObject ? (
    <ProjectContext.Provider
      value={{
        project,
        glossaryTerms: unformattedGlossaryItems,
        references: unformattedReferences,
        anchors: anchors,
      }}
    >
      {children}
    </ProjectContext.Provider>
  ) : null;
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  return context;
};
