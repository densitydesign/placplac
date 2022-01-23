import React, { Component, ErrorInfo, ReactNode } from "react";
import { Error as DefaultError } from "react-admin";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: undefined, errorInfo: undefined };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  public render() {
    if (this.state.error) {
      return (
        <DefaultError
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
