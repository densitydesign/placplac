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
import { UserEdit } from "./Users/UserEdit";
import { UserList } from "./Users/UserList";
import SignUp from "./SignUp/SignUp";
import { LoginPage } from "./LoginPage";
function App() {
  const authProvider = jwtTokenAuthProvider({
    obtainAuthTokenUrl: `${url}/token/`,
  });
  const dataProvider = drfProvider(url);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Admin
        theme={{ palette: { primary: { main: "#000000" } } }}
        loginPage={LoginPage}
        customRoutes={[
          <RouteWithoutLayout
            component={ProjectShowBackend}
            path="/preview/:id"
          />,
          <RouteWithoutLayout component={SignUp} path="/register" />,
        ]}
        layout={CustomLayout}
        history={history}
        authProvider={authProvider}
        dataProvider={dataProvider}
      >
        {(permissions) => [
          <Resource
            name="projects"
            list={ProjectList}
            edit={ProjectEdit}
            create={ProjectCreate}
          />,
          <Resource
            name="experiments"
            create={ExperimentCreate}
            edit={ExperimentEdit}
          />,
          <Resource name="media" />,
          <Resource
            name="glossary-terms"
            create={GlossaryTermCreate}
            edit={GlossaryTermEdit}
          />,
          <Resource name="steps" create={StepCreate} edit={StepEdit} />,
          <Resource name="glossary-categories" />,
          <Resource name="project-collaborators" />,
          permissions.includes("authentication.change_user") ? (
            <Resource name="users" edit={UserEdit} list={UserList} />
          ) : null,
        ]}
      </Admin>
    </MuiPickersUtilsProvider>
  );
}

export default App;
