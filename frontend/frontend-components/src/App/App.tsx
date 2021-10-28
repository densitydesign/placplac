import { ExperimentShow } from "../ExperimentShow";
import { ProjectShow } from "../ProjectShow";
import { Project } from "../types";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { GlossarySidebar } from "./components/GlossarySidebar";
import { ScrollToTop } from "./components/ScrollToTop";
import React from "react";
import classnames from "classnames";
interface AppProps {
  project: Project;
  backend?: boolean;
  mainHistory?: any;
  basePath: string;
}
export const App = (props: AppProps) => {
  const { project, backend = false, basePath } = props;
  return (
    <div className={classnames(styles.main, "main-application")}>
      {/* <Header basePath={basePath} />
      <ScrollToTop />
      <Switch>
        {project.experiments.map((experiment) => (
          <Route
            key={experiment.id}
            exact
            path={`${basePath}/experiments/${experiment.id}`}
            render={() => (
              <ExperimentShow
                basePath={basePath}
                experiment={experiment}
                glossaryTerms={project.glossary_terms}
              />
            )}
          />
        ))}
        <Route
          exact
          path={basePath}
          render={() => (
            <ProjectShow
              basePath={basePath}
              project={project}
              backend={backend}
            />
          )}
        />
      </Switch>

      <GlossarySidebar
        basePath={basePath}
        backend={backend}
        glossaryTerms={project.glossary_terms}
      /> */}
    </div>
  );
};
