import { GlossaryTerm, Reference } from '@algocount/shared/types';
import React, { useContext } from 'react';
import { Identifier, useGetList } from 'react-admin';

interface IProjectContext {
  glossaryTerms: GlossaryTerm[];
  references: Reference[];
  project?: string | number;
}

const defaultState = {
  glossaryTerms: [],
  references: [],
  project: undefined,
};

const ProjectContext = React.createContext<IProjectContext>(defaultState);

export const ProjectContextProvider: React.FC<{ project: Identifier }> = (
  props
) => {
  const { children, project } = props;
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
  return unformattedGlossaryItems && unformattedReferences ? (
    <ProjectContext.Provider
      value={{
        project,
        glossaryTerms: unformattedGlossaryItems,
        references: unformattedReferences,
      }}
    >
      {children}
    </ProjectContext.Provider>
  ) : null;
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw Error('Use this hook inside a ProjectContext');
  return context;
};
