import { Route, Switch } from "react-router-dom";
import { ExperimentShow } from "./components/ExperimentShow";
import { ProjectShow } from "./components/ProjectShow";
import { Project } from "../types";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { GlossarySidebar } from "./components/GlossarySidebar";
import { History } from "history";
import { ScrollToTop } from "./components/ScrollToTop";
import React from "react";
import classnames from "classnames";
interface AppProps {
  project: Project;
  backend?: boolean;
  mainHistory: History<unknown>;
  basePath: string;
}
export const App = (props: AppProps) => {
  const { project, backend = false, mainHistory, basePath } = props;
  return (
    <div className={classnames(styles.main, "main-application")}>
      <Header basePath={basePath} />
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
        mainHistory={mainHistory}
        backend={backend}
        glossaryTerms={project.glossary_terms}
      />
    </div>
  );
};
