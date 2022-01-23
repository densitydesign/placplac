import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../../../libs/shared/styles/src/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
