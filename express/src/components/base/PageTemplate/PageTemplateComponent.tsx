/* tslint:disable:max-line-length */
import * as React from 'react';
import Head from 'next/head';

type Props = {
  altUrlPath: string;
  canonical?: string;
  children: Array<JSX.Element | JSX.Element[]>;
  countryCode: string;
  countryName: string;
  description: string;
  domainSpecific: boolean;
  keywords: string;
  locale: string;
  title: string;
  urlSuffix: string;
};

const PageTemplate = ({ altUrlPath, canonical, children, countryCode, countryName, description, domainSpecific, keywords, locale, title, urlSuffix }: Props) => (
  <React.Fragment>
    <Head>
      <title>
        {title}
      </title>
      <meta
        content={title}
        property="og:title"
      />
      <meta
        content={description}
        property="og:description"
      />
      <meta
        content={`https://www.zipcube.com/${urlSuffix}`}
        property="og:url"
      />
      <meta
        content={title}
        name="twitter:title"
      />
      <meta
        content={description}
        name="twitter:description"
      />
      <meta
        content={description}
        name="description"
      />
      <meta
        content={`${keywords}, Zipcube`}
        name="keywords"
      />
      <meta
        content={countryCode}
        name="geo.country"
      />
      <meta
        content={countryName}
        name="geo.placename"
      />
      <meta
        content={countryCode}
        name="geo.region"
      />
      {!domainSpecific &&
        <React.Fragment>
          <link
            href={`https://www.zipcube.com/uk${altUrlPath}`}
            hrefLang="en-GB"
            rel="alternate"
            type="text/html"
          />
          <link
            href={`https://www.zipcube.com/ie${altUrlPath}`}
            hrefLang="en-IE"
            rel="alternate"
            type="text/html"
          />
          <link
            href={`https://www.zipcube.com/us${altUrlPath}`}
            hrefLang="en-US"
            rel="alternate"
            type="text/html"
          />
          <link
            href={`https://www.zipcube.com/fr${altUrlPath}`}
            hrefLang="fr-FR"
            rel="alternate"
            type="text/html"
          />
          <link
            href={`https://www.zipcube.com/de${altUrlPath}`}
            hrefLang="de-DE"
            rel="alternate"
            type="text/html"
          />
          <link
            href={`https://www.zipcube.com/uk${altUrlPath}`}
            hrefLang="en"
            rel="alternate"
            type="text/html"
          />
          <link
            href={`https://www.zipcube.com/fr${altUrlPath}`}
            hrefLang="fr"
            rel="alternate"
            type="text/html"
          />
          <link
            href={`https://www.zipcube.com/de${altUrlPath}`}
            hrefLang="de"
            rel="alternate"
            type="text/html"
          />
        </React.Fragment>
      }
      {canonical &&
        <link
          href={`https://www.zipcube.com/${canonical}`}
          rel="canonical"
        />
      }
      <meta
        content="website"
        property="og:type"
      />
      <meta
        content={locale}
        property="og:locale"
      />
      <meta
        content="Zipcube.com"
        property="og:site_name"
      />
      <meta
        content="summary"
        name="twitter:card"
      />
      <meta
        content="@Zipcube"
        name="twitter:site"
      />
      <meta
        content="@Zipcube"
        name="twitter:creator"
      />
      <meta
        content="315597152419-ustu5t4je8o87mfmq4v5koltq673lgg1.apps.googleusercontent.com"
        name="google-signin-client_id"
      />
    </Head>
    {children}
  </React.Fragment>
);

export default PageTemplate;
