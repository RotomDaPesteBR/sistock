import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="/box.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://sistock.vercel.app/" />
          <meta property="og:title" content="Sistock" />
          <meta
            property="og:description"
            content="Sistema de gerenciamento de estoque"
          />
          <meta
            property="og:image"
            content="https://sistock.vercel.app/box.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
            rel="stylesheet"
          />

          <meta name="application-name" content="Sistock" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Sistock" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#20aaff" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#fafafa" />

          <link
            rel="apple-touch-icon"
            href="https://sistock.vercel.app/box.png"
          />
          <link rel="shortcut icon" href="https://sistock.vercel.app/box.png" />

          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:url"
            content="https://sistock.vercel.app/box.png"
          />
          <meta name="twitter:title" content="Sistock" />
          <meta
            name="twitter:description"
            content="Sitema de gerenciamento de estoque"
          />
          <meta
            name="twitter:image"
            content="https://sistock.vercel.app/box.png"
          />
          <meta name="twitter:creator" content="@rotomdapestebr" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
