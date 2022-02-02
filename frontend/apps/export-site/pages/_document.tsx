import Document, { Html, Head, Main, NextScript } from 'next/document';

function getRealPath(url: string) {
  return `${process.env.NX_BASE_PATH}${url}`;
}

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/x-icon"
            href={getRealPath('/assets/favicon_io/favicon.ico')}
          />
          <link
            rel="manifest"
            href={getRealPath('/assets/favicon_io/site.webmanifest.json')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={getRealPath('/assets/favicon_io/android-chrome-192x192.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href={getRealPath('/assets/favicon_io/android-chrome-512x512.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={getRealPath('/assets/favicon_io/favicon-32x32.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={getRealPath('/assets/favicon_io/favicon-16x16.png')}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={getRealPath('/assets/favicon_io/apple-touch-icon')}
          />
        </Head>
        <body id="root">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
