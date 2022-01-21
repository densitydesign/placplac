import * as React from "react";
import { Field, Form } from "react-final-form";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useTranslate, useLogin, useNotify, useSafeSetState } from "ra-core";

interface Props {
  redirectTo?: string;
}

interface FormData {
  username: string;
  password: string;
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      padding: "0 1em 1em 1em",
    },
    input: {
      marginTop: "1em",
    },
    button: {
      width: "100%",
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
  { name: "RaLoginForm" }
);

const Input = ({
  meta: { touched, error }, // eslint-disable-line react/prop-types
  input: inputProps, // eslint-disable-line react/prop-types
  ...props
}: any) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

export const LoginForm = (props: Props) => {
  const { redirectTo } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const login = useLogin();
  const translate = useTranslate();
  const notify = useNotify();
  const classes = useStyles(props);

  const validate = (values: FormData) => {
    const errors: any = { username: undefined, password: undefined };

    if (!values.username) {
      errors.username = translate("ra.validation.required");
    }
    if (!values.password) {
      errors.password = translate("ra.validation.required");
    }
    return errors;
  };

  const submit = (values: any) => {
    setLoading(true);
    login(values, redirectTo)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message,
          "warning",
          {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          }
        );
      });
  };

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                autoFocus
                id="username"
                name="username"
                component={Input}
                label={translate("ra.auth.username")}
                disabled={loading}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="password"
                name="password"
                component={Input}
                label={translate("ra.auth.password")}
                type="password"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
          </div>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              {loading && (
                <CircularProgress
                  className={classes.icon}
                  size={18}
                  thickness={2}
                />
              )}
              {translate("ra.auth.sign_in")}
            </Button>
          </CardActions>
          <Box padding={2}>
            <Grid container justify="center">
              <Grid item>
                <Link href="/register" variant="body2">
                  Do not have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    />
  );
};