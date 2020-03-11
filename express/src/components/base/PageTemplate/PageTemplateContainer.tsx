/* tslint:disable:max-line-length */
import * as React from 'react';
import Router from 'next/router';

// Connectors
import { useConfig, useLang } from '@src/store/connectors';

// Utils
import { handlePathname } from '@src/utils';

// Helpers
import { TranslationHelper } from '@src/helpers';
import PageTemplate from './PageTemplateComponent';

// Components
import Header from '@src/components/concrete/Header';
import Footer from '@src/components/concrete/Footer';

// Types
import { Store } from '@src/typings/types';

type Props = {
  children: JSX.Element | JSX.Element[];
  config: Store.Config;
  disableFooter?: boolean;
  hasCanonical?: boolean;
  lang: Store.Lang;
  url?: string;
};

type State = {
  altUrlPath: string;
  canonical: string;
  description: string;
  domainSpecific: boolean;
  keywords: string;
  title: string;
  urlSuffix: string;
};

class PageTemplateContainer extends React.Component<Props, State> {
  static defaultProps = {
    disableFooter: false,
    hasCanonical: false,
  };

  protected meta;
  protected translationHelper;

  constructor(props: Props) {
    super(props);
    this.meta = this.setMeta();
    this.state = {
      altUrlPath: this.meta.altUrlPath,
      canonical: this.meta.canonical,
      description: this.meta.description,
      domainSpecific: this.meta.domainSpecific,
      keywords: this.meta.keywords,
      title: this.meta.title,
      urlSuffix: this.meta.urlSuffix,
    };
  }

  componentDidMount() {
    // Set router event listener
    this.updateMeta();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { config: { domain, route: { langKey } } } = this.props;
    const { description, keywords, title } = this.state;
    if (nextProps.config.domain !== domain) {
      return true;
    }
    if (nextProps.config.route.langKey !== langKey) {
      return true;
    }
    if (nextState.description !== description) {
      return true;
    }
    if (nextState.keywords !== keywords) {
      return true;
    }
    if (nextState.title !== title) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    // Unset router event listener
    Router.router.events.off('routeChangeComplete', this.handleRouteChangeComplete);
  }

  handleRouteChangeComplete = () => {
    this.setState(this.setMeta());
  }

  setMeta = () => {
    const { config: { domain, route, route: { domainSpecific, langKey, pathname } }, url } = this.props;
    let urlSuffix = domain;
    if (!domain) {
      urlSuffix = 'uk';
    }
    let altUrlPath = '';
    let canonical = '';
    if (pathname && url) {
      const realPathname = handlePathname(route, url);
      altUrlPath = `${realPathname}`;
      canonical = `${urlSuffix}${realPathname}`;
    }
    this.translationHelper = new TranslationHelper({ messages: this.props.lang });
    return {
      altUrlPath,
      canonical,
      description: this.translationHelper.exists(`meta.${langKey}.description`) ? this.translationHelper.get(`meta.${langKey}.description`) : '',
      domainSpecific,
      keywords: this.translationHelper.exists(`meta.${langKey}.keywords`) ? this.translationHelper.get(`meta.${langKey}.keywords`) : '',
      title: this.translationHelper.get(`meta.${langKey}.title`),
      urlSuffix,
    };
  }

  updateMeta = () => {
    // Set router event listener
    Router.router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
  }

  render() {
    const { children, config: { countryCode, countryName, locale }, disableFooter, hasCanonical } = this.props;
    const { altUrlPath, canonical, description, domainSpecific, keywords, title, urlSuffix } = this.state;
    return (
      <PageTemplate
        altUrlPath={altUrlPath}
        countryCode={countryCode}
        countryName={countryName}
        description={description}
        domainSpecific={domainSpecific}
        keywords={keywords}
        locale={locale}
        title={title}
        urlSuffix={urlSuffix}
        {...(!hasCanonical ? { canonical: canonical } : {})}
      >
        <Header />
        {children}
        {!disableFooter &&
          <Footer />
        }
      </PageTemplate>
    );
  }
}

export default useConfig(useLang(PageTemplateContainer));
