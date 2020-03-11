import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { StyleSheetServer } from 'aphrodite';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage, query }) {
    const { html, css } = StyleSheetServer.renderStatic(() => renderPage());
    const dev = process.env.NODE_ENV !== 'production';
    // const ids = css.renderedClassNames;
    return {
      ...html,
      css,
      // ids,
      query,
      dev
    };
  }

  constructor(props) {
    super(props);
    // console.log(props)
    /* Take the renderedClassNames from aphrodite (as generated
    in getInitialProps) and assign them to __NEXT_DATA__ so that they
    are accessible to the client for rehydration. */
    // const { __NEXT_DATA__, ids } = props;
    // if (ids) {
    //   __NEXT_DATA__.ids = this.props.ids;
    // }
  }

  render() {
    const { dev, query: { language } } = this.props;
    return (
      <Html lang={language}>
        <Head>
          {!dev &&
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-K3TTXZ');
                `
              }}
            />
          }
          <meta
            content="text/html; charset=utf-8"
            httpEquiv="content-type"
          />
          <meta
            content="_top"
            httpEquiv="window-target"
          />
          <meta
            content="text/css"
            httpEquiv="content-style-type"
          />
          <meta
            content="text/javascript"
            httpEquiv="content-script-type"
          />
          <meta
            content="#00c6ff"
            name="theme-color"
          />
          <meta
            content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1"
            name="viewport"
          />
          {/* <link
            href="/manifest.json"
            rel="manifest"
          /> */}
          <link
            href="/favicon.ico"
            rel="shortcut icon"
            type="image/x-icon"
          />
          <link
            href="/apple-icon-57x57.png"
            rel="apple-touch-icon"
            type="image/png"
          />
          <link
            href="/apple-icon-72x72.png"
            rel="apple-touch-icon"
            sizes="72x72"
            type="image/png"
          />
          <link
            href="/apple-icon-114x114.png"
            rel="apple-touch-icon"
            sizes="114x114"
            type="image/png"
          />
          <link
            href="/apple-icon-144x144.png"
            rel="apple-touch-icon"
            sizes="144x144"
            type="image/png"
          />
          <link
            href="/icon-192x192.png"
            rel="icon"
            sizes="192x192"
            type="image/png"
          />
          <link
            href="/icon-512x512.png"
            rel="icon"
            sizes="512x512"
            type="image/png"
          />
          <link
            href="https://plus.google.com/+Zipcube"
            rel="publisher"
          />
          <style dangerouslySetInnerHTML={{
            __html: `
              *, ::after, ::before {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
              }
            `
          }}
          />
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{
              __html: this.props.css.content
            }}
          />
        </Head>
        <body>
          {!dev &&
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-K3TTXZ"
                height="0"
                width="0"
                style={{
                  display: 'none',
                  visibility: 'hidden'
                }}
              />
            </noscript>
          }
          <Main />
          <script
            src={`https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.9/core.min.js`}
            type="text/javascript"
          />
          <script
            src={`https://maps.googleapis.com/maps/api/js?v=3&language=${language}&libraries=places,geometry&key=${process.env.GOOGLE_MAP_API_KEY}`} // eslint-disable-line
            type="text/javascript"
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
