import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout as MainLayout } from "frontend-components";
import Link from "next/link";
import "frontend-components/dist/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout
      basePath=""
      linkComponent={Link}
      backend={false}
      glossaryTerms={[]}
    >
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
