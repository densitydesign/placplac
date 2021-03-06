import jwtTokenAuthProvider from './authProvider';
import drfProvider from './dataProvider';
import { url } from './constants';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { ExperimentEdit } from './Projects/Experiments/ExperimentEdit';
import { GlossaryTermEdit } from './Projects/GlossaryTerms/GlossaryTermEdit';
import { ReferenceEdit } from './Projects/References/ReferenceEdit';
import { GlossaryCategoryEdit } from './Projects/GlossaryCategories/GlossaryCategoryEdit';
import { StepEdit } from './Projects/Experiments/Steps/StepEdit';
import { ProjectShowBackend } from './components/showComponentsBackend/ProjectShowBackend';
import { history } from './browserHistory';
import { UserEdit } from './Users/UserEdit';
import { UserList } from './Users/UserList';
import SignUp from './SignUp/SignUp';
import GroupIcon from '@mui/icons-material/Group';
import { LoginPage } from './LoginPage';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ProjectResource } from './Projects';
function App() {
  const authProvider = jwtTokenAuthProvider({
    obtainAuthTokenUrl: `${url}/token/`,
  });
  const dataProvider = drfProvider(url);
  return (
    <Admin
      theme={{
        palette: { primary: { main: '#000000' } },
        components: {
          MuiFormLabel: {
            styleOverrides: { root: { color: 'black', fontWeight: 'bold' } },
          },
          //   MuiFilledInput: {
          //     styleOverrides: { inputMarginDense: { paddingTop: '30px' } },
          //   },
        },
      }}
      loginPage={LoginPage}
      history={history}
      authProvider={authProvider}
      dataProvider={dataProvider}
      layout={Layout}
    >
      <CustomRoutes noLayout>
        <Route element={<ProjectShowBackend />} path="/preview/:id/*" />,
        <Route element={<SignUp />} path="/register" />
      </CustomRoutes>
      {(permissions) => (
        <>
          <Resource {...ProjectResource} />
          <Resource name="experiments" edit={ExperimentEdit} />,
          <Resource name="project-media" />,
          <Resource name="glossary-terms" edit={GlossaryTermEdit} />,
          <Resource name="steps" edit={StepEdit} />,
          <Resource name="step-downloads" />,
          <Resource name="experiment-additional-material" />,
          <Resource name="glossary-categories" edit={GlossaryCategoryEdit} />,
          <Resource name="project-collaborators" />,
          <Resource name="references" edit={ReferenceEdit} />,
          {permissions?.includes('authentication.change_user') ? (
            <Resource
              icon={GroupIcon}
              name="users"
              edit={UserEdit}
              list={UserList}
            />
          ) : null}
        </>
      )}
    </Admin>
  );
}

export default App;
