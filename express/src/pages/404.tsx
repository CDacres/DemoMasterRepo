import * as React from 'react';
import Head from 'next/head';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Connectors
import { useConfig, useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import withLegacy from '@src/components/pagebuilders/legacy';
import GenericHeader from '@src/components/concrete/GenericHeader';
import BodyText from '@src/components/concrete/BodyText';
import HelpSection from '@src/components/concrete/HelpSection';
import Header from '@src/components/concrete/Header';
import Footer from '@src/components/concrete/Footer';

// Types
import { Store } from '@src/typings/types';

type Props = PageProps & {
  config: Store.Config;
  lang: Store.Lang;
};

class NotFound extends React.Component<Props, {}> {
  translationHelper = new TranslationHelper({ messages: this.props.lang });

  meta = {
    title: this.translationHelper.get(`meta.error.not_found_title`),
  };

  static async getInitialProps({ state: { redux }, req }: Ctx) {
    const isServer = !!req;

    await initStateGenerator(isServer, redux, req);

    return {};
  }

  render() {
    const { config: { domain } } = this.props;
    let urlSuffix = domain;
    if (!domain) {
      urlSuffix = 'uk';
    }
    return (
      <React.Fragment>
        <Head>
          <title>
            {this.meta.title}
          </title>
          <meta
            content={this.meta.title}
            property="og:title"
          />
          <meta
            content={`https://www.zipcube.com/${urlSuffix}`}
            property="og:url"
          />
          <meta
            content={this.meta.title}
            name="twitter:title"
          />
        </Head>
        <Header />
        <div className={css(pagestyles.container)}>
          <GenericHeader
            stylesArray={[pagestyles.h1Small]}
            tag="h1"
            text="404"
          />
          <BodyText>
            {this.translationHelper.get(`error.page_not_exists`)}
            <HelpSection />
          </BodyText>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withLegacy(useConfig(useLang(NotFound)));
