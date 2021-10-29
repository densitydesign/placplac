import "../styles/globals.css";
import type { AppProps } from "next/app";
import "frontend-components/dist/index.css";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/layout"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
