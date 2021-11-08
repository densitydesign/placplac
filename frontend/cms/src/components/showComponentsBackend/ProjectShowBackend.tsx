import { useQuery } from "ra-core";
import { history } from "../../browserHistory";
import { Route, Switch, useParams } from "react-router";
import {
  ExperimentShow,
  ProjectShow,
  Layout,
  GlossaryShow,
  GlossaryCategoryShow,
} from "frontend-components";
import "frontend-components/dist/index.css";
import { Link as LinkRR, LinkProps as LinkRRProps } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

interface LinkProps extends Omit<LinkRRProps, "to"> {
  href: string;
}
const Link = ({ href, ...props }: LinkProps) => <LinkRR to={href} {...props} />;

export const ProjectShowBackend = () => {
  let { id } = useParams<{ id: string }>();
  const { data: project } = useQuery(
    {
      type: "getFull",
      resource: "projects",
      payload: { id },
    },
    {
      onFailure: () => {
        history.push("/");
      },
    }
  );
  const basePath = `/preview/${id}/`;
  return project ? (
    <Layout
      experiments={project.experiments}
      linkComponent={Link}
      basePath={basePath}
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
                glossaryCategories={project.glossary_categories}
                basePath={basePath}
                experiment={experiment}
                glossaryTerms={project.glossary_terms}
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
