import { useQuery } from 'ra-core';
import { history } from '../../browserHistory';
import { Route, Switch, useParams } from 'react-router';
import {
  ExperimentShow,
  ProjectShow,
  Layout,
  GlossaryShow,
  GlossaryCategoryShow,
} from '@algocount/ui-site';
import { HashLink as LinkRR } from 'react-router-hash-link';
import { LinkProps as LinkRRProps } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';

interface LinkProps extends Omit<LinkRRProps, 'to'> {
  href: string;
}
const Link = ({ href, ...props }: LinkProps) => <LinkRR to={href} {...props} />;

export const ProjectShowBackend = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useQuery(
    {
      type: 'getFull',
      resource: 'projects',
      payload: { id },
    },
    {
      onFailure: () => {
        history.push('/');
      },
    }
  );
  const basePath = `/preview/${id}/`;
  return project ? (
    <Layout
      language={project.language}
      experiments={project.experiments}
      linkComponent={Link}
      basePath={basePath}
      footer={project.footer}
    >
      <ScrollToTop />
      <Switch>
        {project.experiments.map((experiment: any) => (
          <Route
            key={experiment.id}
            exact
            path={`${basePath}experiments/${experiment.id}`}
            render={() => (
              <ExperimentShow
                language={project.language}
                glossaryCategories={project.glossary_categories}
                basePath={basePath}
                experiment={experiment}
                linkComponent={Link}
              />
            )}
          />
        ))}
        <Route
          exact
          path={basePath}
          render={() => (
            <ProjectShow
              glossaryCategories={project.glossary_categories}
              basePath={basePath}
              project={project}
              linkComponent={Link}
              glossaryTerms={project.glossary_terms}
            />
          )}
        />
        <Route
          exact
          path={`${basePath}glossary/`}
          render={() => (
            <GlossaryShow
              language={project.language}
              description={project.glossary_description}
              basePath={basePath}
              linkComponent={Link}
              glossaryCategories={project.glossary_categories}
              glossaryTerms={project.glossary_terms}
            />
          )}
        />
        {project.glossary_categories.map((category: any) => (
          <Route
            key={category.id}
            exact
            path={`${basePath}glossary/${category.id}/`}
            render={() => (
              <GlossaryCategoryShow
                basePath={basePath}
                glossaryCategory={category}
                glossaryTerms={project.glossary_terms.filter(
                  (term: any) => term.category_title === category.title
                )}
              />
            )}
          />
        ))}
      </Switch>
    </Layout>
  ) : null;
};
