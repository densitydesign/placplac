import jwtTokenAuthProvider from "./authProvider";
import drfProvider from "./dataProvider";
import { url } from "./constants";
import { Admin, Resource, RouteWithoutLayout } from "react-admin";
import { CustomLayout } from "./components/CustomLayout";
import { ProjectList } from "./Projects/ProjectList";
import { ProjectEdit } from "./Projects/ProjectEdit";
import { ProjectCreate } from "./Projects/ProjectCreate";
import { ExperimentEdit } from "./Projects/Experiments/ExperimentEdit";
import { GlossaryTermEdit } from "./Projects/GlossaryTerms/GlossaryTermEdit";
import { GlossaryCategoryEdit } from "./Projects/GlossaryCategories/GlossaryCategoryEdit";
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
    <Admin
      theme={{
        palette: { primary: { main: "#000000" } },
        overrides: {
          MuiFormLabel: { root: { color: "black", fontWeight: "bold" } },
          MuiFilledInput: {
            inputMarginDense: { paddingTop: "30px" },
          },
        },
      }}
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
        <Resource name="experiments" edit={ExperimentEdit} />,
        <Resource name="media" />,
        <Resource name="glossary-terms" edit={GlossaryTermEdit} />,
        <Resource name="steps" edit={StepEdit} />,
        <Resource name="glossary-categories" edit={GlossaryCategoryEdit} />,
        <Resource name="project-collaborators" />,
        permissions.includes("authentication.change_user") ? (
          <Resource name="users" edit={UserEdit} list={UserList} />
        ) : null,
      ]}
    </Admin>
  );
}

export default App;
