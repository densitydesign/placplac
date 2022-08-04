import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Grid,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  useTranslate,
  useLogin,
  useNotify,
  useSafeSetState,
  TextInput,
  PasswordInput,
} from 'react-admin';
import { Form } from 'react-admin';
import { FieldErrors, FieldValues } from 'react-hook-form';

const PREFIX = 'RaLoginForm';

const classes = {
  form: `${PREFIX}-form`,
  input: `${PREFIX}-input`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.form}`]: {
    padding: '0 1em 1em 1em',
  },

  [`& .${classes.input}`]: {
    marginTop: '1em',
  },

  [`& .${classes.button}`]: {
    width: '100%',
  },

  [`& .${classes.icon}`]: {
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  redirectTo?: string;
}

export const LoginForm = (props: Props) => {
  const { redirectTo } = props;
  const [loading, setLoading] = useSafeSetState(false);
  const login = useLogin();
  const translate = useTranslate();
  const notify = useNotify();

  const validate = (values: FieldValues) => {
    const errors: any = {};
    if (!values.username) {
      errors.username = translate('ra.validation.required');
    }
    if (!values.password) {
      errors.password = translate('ra.validation.required');
    }
    console.log(errors);
    return errors;
  };

  const submit = (values: FieldValues) => {
    setLoading(true);
    login(values, redirectTo)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
          {
            type: 'warning',
            messageArgs: {
              _:
                typeof error === 'string'
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          }
        );
      });
  };

  return (
    <Form onSubmit={submit} validate={validate}>
      <Root>
        <div className={classes.form}>
          <div className={classes.input}>
            <TextInput
              label={translate('ra.auth.username')}
              source="username"
              fullWidth
            />
          </div>
          <div className={classes.input}>
            <PasswordInput
              label={translate('ra.auth.password')}
              source="password"
              fullWidth
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
            {translate('ra.auth.sign_in')}
          </Button>
        </CardActions>
        <Box padding={2}>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/register" variant="body2">
                Do not have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Root>
    </Form>
  );
};
