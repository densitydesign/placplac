import { history } from '../../browserHistory';
import { Outlet, Route, Routes, useParams } from 'react-router';
import {
  ExperimentShow,
  Layout,
  GlossaryShow,
  GlossaryCategoryShow,
  ProjectShow,
} from '@algocount/ui-site';
import { HashLink as LinkRR } from 'react-router-hash-link';
import { LinkProps as LinkRRProps } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { useQuery } from 'react-query';
import { client } from '../../dataProvider';
interface LinkProps extends Omit<LinkRRProps, 'to'> {
  href: string;
}
const Link = ({ href, ...props }: LinkProps) => <LinkRR to={href} {...props} />;

export const ProjectShowBackend = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useQuery(
    ['projects', 'getFull', id],
    () => client(`projects/${id}/get_full`, { method: 'GET' }),
    {
      onError: () => {
        history.push('/');
      },
    }
  );
  const basePath = `/preview/${id}/`;
  return project ? (
    <Routes>
      <Route
        path={'/'}
        element={
          <Layout project={project} linkComponent={Link} basePath={basePath}>
            <ScrollToTop />
            <Outlet />
          </Layout>
        }
      >
        <Route
          path={`/`}
          element={
            <ProjectShow
              basePath={basePath}
              project={project}
              linkComponent={Link}
            />
          }
        />
        {project.experiments.map((experiment: any) => (
          <Route
            key={experiment.id}
            path={`experiments/${experiment.id}`}
            element={
              <ExperimentShow
                language={project.language}
                glossaryCategories={project.glossary_categories}
                basePath={basePath}
                experiment={experiment}
                linkComponent={Link}
              />
            }
          />
        ))}
        <Route
          path={`glossary/`}
          element={
            <GlossaryShow
              language={project.language}
              description={project.glossary_description}
              basePath={basePath}
              linkComponent={Link}
              glossaryCategories={project.glossary_categories}
              glossaryTerms={project.glossary_terms}
            />
          }
        />
        {project.glossary_categories.map((category: any) => (
          <Route
            key={category.id}
            path={`glossary/${category.id}/`}
            element={
              <GlossaryCategoryShow
                linkComponent={Link}
                basePath={basePath}
                glossaryCategory={category}
                glossaryTerms={project.glossary_terms.filter(
                  (term: any) => term.category_title === category.title
                )}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  ) : null;
};
