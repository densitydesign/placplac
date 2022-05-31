import { Login } from 'react-admin';
import { LoginProps } from 'react-admin';
import React from 'react';
import { LoginForm } from './components/LoginForm';
export const LoginPage = (props: LoginProps) => {
  return (
    <Login {...props}>
      <LoginForm />
    </Login>
  );
};
