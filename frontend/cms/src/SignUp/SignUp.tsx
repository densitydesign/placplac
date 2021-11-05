import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Form } from "react-final-form";
import { PasswordInput, TextInput } from "ra-ui-materialui";
import axios from "axios";
import { url } from "../constants";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [registered, setRegistered] = useState(false);

  const onSubmit = (values: Record<string, any>) => {
    return axios
      .post(`${url}/register/`, values)
      .then(() => {
        setRegistered(true);
      })
      .catch((error) => {
        if (error.response.data) {
          let errorDict: Record<string, string> = {};
          Object.keys(error.response.data).forEach((key) => {
            errorDict[key] = error.response.data[key].join(". ");
          });
          return errorDict;
        }
      });
  };
  return (
    <Container component="main" maxWidth="xs">
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
            <Grid container justify="center">
              <Grid item>
                <Link href="/" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
          </>
        ) : (
          <form className={classes.form} noValidate>
            <Form
              onSubmit={onSubmit}
              render={({ form, handleSubmit }) => (
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
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </>
              )}
            />
          </form>
        )}
      </div>
    </Container>
  );
}
