import jwtTokenAuthProvider from "./authProvider";
import drfProvider from "./dataProvider";
import { url } from "./constants";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Admin, Resource, RouteWithoutLayout } from "react-admin";
import { CustomLayout } from "./components/CustomLayout";
import { ProjectList } from "./Projects/ProjectList";
import { ProjectEdit } from "./Projects/ProjectEdit";
import { ProjectCreate } from "./Projects/ProjectCreate";
import { ExperimentCreate } from "./Projects/Experiments/ExperimentCreate";
import { ExperimentEdit } from "./Projects/Experiments/ExperimentEdit";
import { GlossaryTermCreate } from "./Projects/GlossaryTerms/GlossaryTermCreate";
import { GlossaryTermEdit } from "./Projects/GlossaryTerms/GlossaryTermEdit";
import { StepCreate } from "./Projects/Experiments/Steps/StepCreate";
import { StepEdit } from "./Projects/Experiments/Steps/StepEdit";
import { ProjectShowBackend } from "./components/showComponentsBackend/ProjectShowBackend";
import { history } from "./browserHistory";
function App() {
  const authProvider = jwtTokenAuthProvider({
    obtainAuthTokenUrl: `${url}/token/`,
  });
  const dataProvider = drfProvider(url);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Admin
        customRoutes={[
          <RouteWithoutLayout
            component={ProjectShowBackend}
            path="/preview/:id"
          />,
        ]}
        layout={CustomLayout}
        history={history}
        authProvider={authProvider}
        dataProvider={dataProvider}
      >
        <Resource
          name="projects"
          list={ProjectList}
          edit={ProjectEdit}
          create={ProjectCreate}
        />
        <Resource
          name="experiments"
          create={ExperimentCreate}
          edit={ExperimentEdit}
        />
        <Resource name="media" />
        <Resource
          name="glossary-terms"
          create={GlossaryTermCreate}
          edit={GlossaryTermEdit}
        />
        <Resource name="steps" create={StepCreate} edit={StepEdit} />
        <Resource name="glossary-categories" />
      </Admin>
    </MuiPickersUtilsProvider>
  );
}

export default App;
