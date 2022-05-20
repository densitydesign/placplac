import classnames from 'classnames';
import { Container } from '@mui/material';
import { LayoutProps, useSidebarState, Error, Menu } from 'react-admin';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorInfo, useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CustomAppBar } from './components/AppBar';
import { styled } from '@mui/material/styles';
import { ReactQueryDevtools } from 'react-query/devtools';
const PREFIX = 'Layout';
const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    overflow: 'hidden',
    height: '100vh',
    width: '100%',
  },

  [`&.${classes.content}`]: {
    flex: '1 auto',
    overflow: 'hidden',
    paddingTop: '58px',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '50px',
    },
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  minHeight: '100%',
  background: theme.palette.background.default,
}));

export const Layout = ({ ...props }: LayoutProps): JSX.Element => {
  const { children, dashboard, title, error: errorComponent } = props;
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>();

  const handleError = (error: Error, info: ErrorInfo) => {
    setErrorInfo(info);
  };
  const [open] = useSidebarState();
  return (
    <StyledDiv className={classnames('layout', classes.root)}>
      <CustomAppBar position="fixed" open={open} />

      <StyledDiv className={classes.content}>
        <Sidebar>
          <Menu hasDashboard={!!dashboard} />
        </Sidebar>
        <div style={{ display: 'flex', flex: '1 auto', overflow: 'hidden' }}>
          <div style={{ flex: '1 auto', height: '100%', overflow: 'auto' }}>
            <StyledContainer maxWidth={false}>
              <ErrorBoundary
                onError={handleError}
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <Error
                    error={error}
                    errorComponent={errorComponent}
                    errorInfo={errorInfo}
                    resetErrorBoundary={resetErrorBoundary}
                    title={title}
                  />
                )}
              >
                {children}
              </ErrorBoundary>
            </StyledContainer>
          </div>
        </div>
      </StyledDiv>
      <ReactQueryDevtools initialIsOpen={false} />
    </StyledDiv>
  );
};
