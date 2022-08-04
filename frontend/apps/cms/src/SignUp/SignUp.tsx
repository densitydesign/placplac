import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Form, PasswordInput, SaveButton, TextInput } from 'react-admin';
import axios from 'axios';
import { url } from '../constants';
import { useState } from 'react';
import { FormSaveButton } from '../components/FormSaveButton';
const PREFIX = 'SignUp';

const classes = {
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  [`& .${classes.form}`]: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [registered, setRegistered] = useState(false);
  const onSubmit = (values: Record<string, any>) => {
    return axios
      .post(`${url}/register/`, values)
      .then(() => {
        setRegistered(true);
      })
      .catch((error) => {
        if (error.response.data) {
          const errorDict: Record<string, string> = {};
          Object.keys(error.response.data).forEach((key) => {
            errorDict[key] = error.response.data[key].join('. ');
          });
          return errorDict;
        }
      });
  };
  return (
    <StyledContainer maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {registered ? (
          <>
            <h1>
              Utente registrato, riceverai una mail quando il tuo account verrà
              attivato!
            </h1>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
          </>
        ) : (
          <Form className={classes.form} onSubmit={onSubmit}>
            <>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    helperText={false}
                    fullWidth
                    variant="outlined"
                    source="first_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    helperText={false}
                    fullWidth
                    variant="outlined"
                    source="last_name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    helperText={false}
                    fullWidth
                    variant="outlined"
                    type="email"
                    source="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordInput
                    helperText={false}
                    variant="outlined"
                    fullWidth
                    source="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordInput
                    helperText={false}
                    variant="outlined"
                    fullWidth
                    label="Confirm password"
                    source="password2"
                  />
                </Grid>
              </Grid>
              <FormSaveButton label="Sign up" />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </>
          </Form>
        )}
      </div>
    </StyledContainer>
  );
}
