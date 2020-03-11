/* tslint:disable:max-line-length */
import * as React from 'react';
import Head from 'next/head';
import { Store as ReduxStore } from 'redux';
import { Request, Response } from 'express';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';
import { JSONLD, Generic, GenericCollection } from 'react-structured-data';

// Styles
import { pagestyles } from '@src/styles';

// Connectors
import { useBrowse, useConfig, useLang, useSearch } from '@src/store/connectors';

// Helpers
import { ColorHelper } from '@src/helpers';

// Redux stuff
import { attachReducers } from '@src/store';
import browsePageReducer, { fetchBrowse } from '@src/store/modules/pages/landing_pages/browse';
import { fetchTags } from '@src/store/modules/search/tags';
import { setSearchParams } from '@src/store/modules/search/params';

// Utils
import { redirect } from '@src/utils';

// Components
import withLegacy from '@src/components/pagebuilders/legacy';
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import PageTemplate from '@src/components/base/PageTemplate';
import LandingTitle from '@src/components/concrete/LandingTitle';
import SearchBar from '@src/components/concrete/SearchBar';
import Banner from '@src/components/concrete/Banners/Banner';
import Advert from '@src/components/concrete/Banners/Banner/Advert';
import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import HtmlTextBlock from '@src/components/concrete/HtmlTextBlock';
import CallToAction from '@src/components/concrete/CallToAction';
import LinkList from '@src/components/concrete/LinkList';
import SectionHeader from '@src/components/concrete/SectionHeader';
import Breadcrumbs from '@src/components/concrete/Breadcrumbs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { LargeScreen } from '@src/components/abstract/MediaQuery';

// Types
import { BreadcrumbType, Store } from '@src/typings/types';

type Props = PageProps & {
  asPath: string;
  config: Store.Config;
  browse: Store.Pages.Browse;
  reduxStore: ReduxStore<any>;
  req: Request;
  res: Response;
  search: { tags: Store.Search.Tags };
  store: ReduxStore<any>;
  urlString: string;
};

class Browse extends React.Component<Props, {}> {
  colorHelper = new ColorHelper();

  static async getInitialProps({ state: { redux }, req, res, query, asPath }: Ctx) {

    const isServer = !!req;

    const { config: { domain, defaultSlug } } = redux.getState();

    const stateGenerator = await initStateGenerator(isServer, redux, req);

    attachReducers(redux, { pages: { browse: browsePageReducer } });

    // Run initial actions through root epic and bind to state generator
    await stateGenerator.addAsyncStateGenerators(fetchTags());
    try {
      const params = { domain, vertical: query.params[0] };
      await stateGenerator.addAsyncStateGenerators(fetchBrowse(params));

      await stateGenerator.generate();

      const { pages: { browse: { data: { attributes: { tagLabelId } } } }, search: { tags: { tags } } } = redux.getState();

      const tag = tags.find(t => t.id.toString() === tagLabelId);

      stateGenerator.bindResultsToGenerator(setSearchParams({ tag: tag.quickSlug }));

      // Then generate the state with later actions
      await stateGenerator.generate();
    } catch (e) {
      const redirectUrl = `/${defaultSlug}`;
      const mobileRedirectUrl = redirectUrl;
      redirect(res, { domain, mobileRedirectUrl, redirectUrl });
      return {};
    }
    return { urlString: isServer ? req.url : asPath };
  }

  componentDidMount() {
    const { store } = this.props;

    // Attach reducers for a second time on the client-side
    attachReducers(store, { pages: { browse: browsePageReducer } });
  }

  render() {
    const {
      browse: {
        data: {
          attributes: {
            bannerButton,
            bannerImg,
            bannerText,
            bannerTextColor,
            bannerTitle,
            breadcrumbs,
            canonicalUrl,
            cards,
            cardSubtitle,
            cardTitle,
            category,
            helpSubtitle,
            helpTitle,
            htmlTextBottom,
            htmlTextTop,
            locationDesc,
            metaDesc,
            metaKeyword,
            metaTitle,
            nearbyLocations,
            nearbyTitle,
            pageSubtitle,
            pageTitle,
            searchUrlFull,
            verticalId,
          },
        },
      },
      urlString,
    } = this.props;
    const schemaBreadcrumbs: BreadcrumbType = breadcrumbs.filter(include => include.fullLink);
    const color = this.colorHelper.getVerticalColors()[verticalId];
    return (
      <PageTemplate
        hasCanonical={true}
        url={urlString}
      >
        <Head>
          <JSONLD dangerouslyExposeHtml={true}>
            <Generic
              jsonldtype="Place"
              schema={{ name: locationDesc }}
              type="place"
            />
          </JSONLD>
          {schemaBreadcrumbs.length > 0 &&
            <JSONLD dangerouslyExposeHtml={true}>
              <Generic
                jsonldtype="BreadcrumbList"
                type="itemList"
              >
                <GenericCollection type="itemListElement">
                  {schemaBreadcrumbs.map((crumb, index) => (
                    <Generic
                      jsonldtype="ListItem"
                      key={shortid.generate()}
                      schema={{
                        item: {
                          '@id': crumb.fullLink,
                          '@type': 'Thing',
                        },
                        name: crumb.text,
                        position: index + 1,
                      }}
                    />
                  ))}
                </GenericCollection>
              </Generic>
            </JSONLD>
          }
          <title>
            {metaTitle}
          </title>
          <meta
            content={metaTitle}
            property="og:title"
          />
          <meta
            content={metaDesc}
            property="og:description"
          />
          <meta
            content={metaTitle}
            name="twitter:title"
          />
          <meta
            content={metaDesc}
            name="twitter:description"
          />
          <meta
            content={metaDesc}
            name="description"
          />
          <meta
            content={`${metaKeyword}, Zipcube`}
            name="keywords"
          />
          <link
            href={canonicalUrl}
            rel="canonical"
          />
        </Head>
        <div className={css(pagestyles.container)}>
          <LandingTitle
            h1={pageTitle}
            h2={pageSubtitle}
          />
          <SearchBar hasTagInput={false} />
          {bannerImg &&
            <Banner
              image={bannerImg}
              sectionTitle={bannerTitle}
            >
              <Advert
                buttonText={bannerButton}
                link={searchUrlFull}
                text={bannerText}
                textColor={bannerTextColor}
              />
            </Banner>
          }
          {htmlTextTop &&
            <LargeScreen>
              {matches => {
                if (matches) {
                  return (
                    <HtmlTextBlock
                      hasLineBottom={true}
                      hasLineTop={true}
                      html={htmlTextTop}
                    />
                  );
                }
                return null;
              }}
            </LargeScreen>
          }
          {cards.length > 0 &&
            <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
              <CardsGrid
                footerLink={searchUrlFull}
                sectionSubtitle={cardSubtitle}
                sectionTitle={cardTitle}
              >
                {cards.map(card => {
                  return (
                    <Card
                      cardCount={12}
                      key={shortid.generate()}
                      newTab={false}
                      {...card}
                    >
                      <CardContent
                        category={category}
                        color={color}
                        newTab={false}
                        {...card}
                      >
                        <CardText {...card} />
                      </CardContent>
                    </Card>
                  );
                })}
              </CardsGrid>
            </Translatable>
          }
          <CallToAction
            imageAltText={helpSubtitle}
            subtitle={helpSubtitle}
            title={helpTitle}
          />
          {(htmlTextBottom || nearbyLocations.length > 0) &&
            <LargeScreen>
              {matches => {
                if (matches) {
                  return (
                    <div>
                      {htmlTextBottom &&
                        <HtmlTextBlock
                          hasLineBottom={true}
                          html={htmlTextBottom}
                        />
                      }
                      {nearbyLocations.length > 0 &&
                        <React.Fragment>
                          <SectionHeader sectionTitle={nearbyTitle} />
                          <LinkList items={nearbyLocations} />
                        </React.Fragment>
                      }
                    </div>
                  );
                }
                return null;
              }}
            </LargeScreen>
          }
          <Breadcrumbs
            items={breadcrumbs}
            type="landing_page"
          />
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(useBrowse(useConfig(useLang(useSearch(Browse)))));
