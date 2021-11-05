import { Login } from "ra-ui-materialui";
import { LoginProps } from "ra-ui-materialui/lib/auth/Login";
import React from "react";
import { LoginForm } from "./components/LoginForm";
export const LoginPage = (props: LoginProps) => {
  return (
    <Login {...props}>
      <LoginForm />
    </Login>
  );
};
