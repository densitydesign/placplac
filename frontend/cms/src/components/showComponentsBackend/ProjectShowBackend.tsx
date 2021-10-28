import { useQuery } from "ra-core";
import { history } from "../../browserHistory";
import { useParams } from "react-router";
import { App } from "frontend-components";
import { Project } from "frontend-components";
import "frontend-components/dist/index.css";
export const ProjectShowBackend = () => {
  let { id } = useParams<{ id: string }>();
  const { data } = useQuery(
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
  console.log(history.location);
  const basePath = `/preview/${id}`;
  return data ? (
    <>
      <App
        mainHistory={history}
        backend={true}
        project={data as unknown as Project}
        basePath={basePath}
      />
    </>
  ) : null;
};
