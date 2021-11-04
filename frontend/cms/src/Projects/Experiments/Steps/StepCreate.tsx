import { useMemo } from "react";
import { Create, CreateProps, useGetOne } from "react-admin";
import { useLocation, useHistory } from "react-router";
import { StepActions } from "./StepActions";
import { StepForm } from "./StepForm";

export const StepCreate = (props: CreateProps) => {
  const location = useLocation();
  const history = useHistory();
  const q = new URLSearchParams(location.search);
  const experiment = q.get("experiment");
  if (!experiment) history.goBack();

  const { data } = useGetOne("experiments", experiment!);
  const redirect = useMemo(
    () => (data && data.project ? `/experiments/${experiment}/5` : false),
    [data, experiment]
  );

  return data ? (
    <Create {...props} actions={<StepActions experiment={experiment!} />}>
      <StepForm
        redirect={redirect}
        initialValues={{ experiment, project: data.project }}
      />
    </Create>
  ) : null;
};
