import type { AppProps } from "next/app";
import type { LayoutProps } from "@vercel/examples-ui/layout";
import { Analytics } from "@vercel/analytics/react";

import { getLayout } from "@vercel/examples-ui";
import "@vercel/examples-ui/globals.css";

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component);

  return (
    <Layout title="1Hive DAO list Middleware" path="">
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

export default App;
