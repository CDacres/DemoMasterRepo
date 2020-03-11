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
import { useConfig, useLanding, useLang, useSearch } from '@src/store/connectors';

// Helpers
import { ColorHelper } from '@src/helpers';

// Constants
import { FAVOURITE, POPULAR, REVIEW, RECENT } from '@src/constants/landingCarouselTypes';

// Redux stuff
import { attachReducers } from '@src/store';
import landingPageReducer, { fetchLanding } from '@src/store/modules/pages/landing_pages/location';
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
import CallToAction from '@src/components/concrete/CallToAction';
import Carousel, { LargeOption } from '@src/components/concrete/Carousel';
import HtmlTextBlock from '@src/components/concrete/HtmlTextBlock';
// import LandingMap from '@src/components/concrete/LandingMap';
import LinkList from '@src/components/concrete/LinkList';
import SectionHeader from '@src/components/concrete/SectionHeader';
import Breadcrumbs from '@src/components/concrete/Breadcrumbs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { LargeScreen } from '@src/components/abstract/MediaQuery';

// Types
import { BreadcrumbType, LandingCardType, Store } from '@src/typings/types';

type Props = PageProps & {
  asPath: string;
  config: Store.Config;
  landing: Store.Pages.Landing;
  reduxStore: ReduxStore<any>;
  req: Request;
  res: Response;
  search: { tags: Store.Search.Tags };
  store: ReduxStore<any>;
  urlString: string;
};

class Location extends React.Component<Props, {}> {
  colorHelper = new ColorHelper();

  static async getInitialProps({ state: { redux }, req, res, query, asPath }: Ctx) {
    const isServer = !!req;

    const { config: { domain, defaultSlug } } = redux.getState();
    const stateGenerator = await initStateGenerator(isServer, redux, req);

    attachReducers(redux, { pages: { landing: landingPageReducer } });

    // Run initial actions through root epic and bind to state generator
    await stateGenerator.addAsyncStateGenerators(fetchTags());
    try {
      const params = { domain, vertical: query.params[0], location: query.params[1] };
      await stateGenerator.addAsyncStateGenerators(fetchLanding(params));

      await stateGenerator.generate();

      const lpState = redux.getState();

      const { pages: { landing: { meta } } } = lpState;

      if (typeof meta !== 'undefined' && meta.length > 0 && meta[0].redirectUrl !== null) {
        const redirectUrl = meta[0].redirectUrl;
        const mobileRedirectUrl = redirectUrl;
        redirect(res, { domain, mobileRedirectUrl, redirectUrl });
        return {};
      }

      const { pages: { landing: { data: { attributes: { searchUrlLocation, tagLabelId } } } }, search: { tags: { tags } } } = lpState;

      const tag = tags.find(t => t.id.toString() === tagLabelId);

      stateGenerator.bindResultsToGenerator(setSearchParams({ location: searchUrlLocation, tag: tag.quickSlug }));

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
    attachReducers(store, { pages: { landing: landingPageReducer } });
  }

  render() {
    const {
      landing: {
        data: {
          attributes: {
            bannerButton,
            bannerImg,
            bannerText,
            bannerTextColor,
            bannerTitle,
            // boundsNeLat,
            // boundsNeLon,
            // boundsSwLat,
            // boundsSwLon,
            breadcrumbs,
            canonicalUrl,
            cards,
            country,
            favouriteCardSubtitle,
            favouriteCardTitle,
            helpSubtitle,
            helpTitle,
            htmlTextBottom,
            htmlTextTop,
            itemCards,
            lat,
            locationDesc,
            long,
            // mapPointers,
            // mapTitle,
            metaDesc,
            metaKeyword,
            metaTitle,
            nearbyLocations,
            nearbyTitle,
            pageSubtitle,
            pageTitle,
            parentLocationDesc,
            popularCardSubtitle,
            popularCardTitle,
            recentCardSubtitle,
            recentCardTitle,
            relatedLinks,
            relatedTitle,
            reviewCardSubtitle,
            reviewCardTitle,
            schemaDesc,
            schemaName,
            searchUrlFull,
            verticalId,
          },
        },
      },
      urlString,
    } = this.props;
    const favourite: LandingCardType = cards.filter(include => include.typeId === FAVOURITE);
    const popular: LandingCardType = cards.filter(include => include.typeId === POPULAR);
    const review: LandingCardType = cards.filter(include => include.typeId === REVIEW);
    const recent: LandingCardType = cards.filter(include => include.typeId === RECENT);
    const schemaBreadcrumbs: BreadcrumbType = breadcrumbs.filter(include => include.fullLink);
    const color = this.colorHelper.getVerticalColors()[verticalId];
    // const bounds = {
    //   ne_lat: boundsNeLat,
    //   ne_lon: boundsNeLon,
    //   sw_lat: boundsSwLat,
    //   sw_lon: boundsSwLon,
    // };
    return (
      <PageTemplate
        hasCanonical={true}
        url={urlString}
      >
        <Head>
          <JSONLD dangerouslyExposeHtml={true}>
            <Generic
              jsonldtype="Place"
              schema={{ name: `${locationDesc}, ${parentLocationDesc}` }}
              type="place"
            >
              <Generic
                jsonldtype="GeoCoordinates"
                schema={{
                  latitude: lat,
                  longitude: long,
                  addressCountry: country,
                }}
                type="geo"
              />
            </Generic>
          </JSONLD>
          {itemCards.length > 0 &&
            <JSONLD dangerouslyExposeHtml={true}>
              <Generic
                jsonldtype="ItemList"
                schema={{
                  name: schemaName,
                  numberOfItems: itemCards.length,
                  description: schemaDesc,
                }}
                type="itemList"
              >
                <GenericCollection type="itemListElement">
                  {itemCards.map((itemcard, index) => (
                    <Generic
                      jsonldtype="ListItem"
                      key={shortid.generate()}
                      schema={{
                        url: itemcard.fullLink,
                        position: index + 1,
                      }}
                    />
                  ))}
                </GenericCollection>
              </Generic>
            </JSONLD>
          }
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
          <meta
            content={`${lat}; ${long}`}
            name="geo.position"
          />
          <meta
            content={lat}
            property="og:latitude"
          />
          <meta
            content={long}
            property="og:longitude"
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
                      hasLineTop={true}
                      html={htmlTextTop}
                      {...(favourite.length > 0 ? { hasLineBottom: true } : {})}
                    />
                  );
                }
                return null;
              }}
            </LargeScreen>
          }
          {favourite.length > 0 &&
            <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
              <CardsGrid
                footerLink={searchUrlFull}
                sectionSubtitle={favouriteCardSubtitle}
                sectionTitle={favouriteCardTitle}
              >
                {favourite.map(card => {
                  return (
                    <Card
                      key={shortid.generate()}
                      {...card}
                    >
                      <CardContent
                        color={color}
                        {...card}
                      >
                        <CardText
                          with3={true}
                          {...card}
                        />
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
          {popular.length > 0 &&
            <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
              <CardsGrid
                footerLink={searchUrlFull}
                sectionSubtitle={popularCardSubtitle}
                sectionTitle={popularCardTitle}
              >
                {popular.map(card => {
                  return (
                    <Card
                      key={shortid.generate()}
                      {...card}
                    >
                      <CardContent
                        color={color}
                        {...card}
                      >
                        <CardText
                          with3={true}
                          {...card}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </CardsGrid>
            </Translatable>
          }
          {review.length > 0 &&
            <Carousel
              id="largeCarouselReview"
              isSlider={true}
              linkComponentProps={{ target: '_blank', rel: 'noopener' }}
              options={review}
              optionTemplate={LargeOption}
              sectionSubtitle={reviewCardSubtitle}
              sectionTitle={reviewCardTitle}
              type="large"
              with3={true}
            />
          }
          {recent.length > 0 &&
            <Carousel
              id="largeCarouselRecent"
              isSlider={true}
              linkComponentProps={{ target: '_blank', rel: 'noopener' }}
              options={recent}
              optionTemplate={LargeOption}
              sectionSubtitle={recentCardSubtitle}
              sectionTitle={recentCardTitle}
              type="large"
              with3={true}
            />
          }
          <LargeScreen>
            {matches => {
              if (matches) {
                return (
                  <div>
                    {htmlTextBottom &&
                      <HtmlTextBlock
                        hasLineBottom={true}
                        html={htmlTextBottom}
                        {...((popular.length > 0 || review.length > 0 || recent.length > 0) ? { hasLineTop: true } : {})}
                      />
                    }
                    {/* <SectionHeader sectionTitle={mapTitle} />
                    <LandingMap
                      bounds={bounds}
                      lat={lat}
                      lon={long}
                      pointers={mapPointers}
                    /> */}
                  </div>
                );
              }
              return null;
            }}
          </LargeScreen>
          {relatedLinks.length > 0 &&
            <React.Fragment>
              <SectionHeader sectionTitle={relatedTitle} />
              <LinkList
                columns={3}
                items={relatedLinks}
              />
            </React.Fragment>
          }
          {nearbyLocations.length > 0 &&
            <LargeScreen>
              {matches => {
                if (matches) {
                  return (
                    <div>
                      <SectionHeader sectionTitle={nearbyTitle} />
                      <LinkList items={nearbyLocations} />
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

export default withLegacy(useConfig(useLanding(useLang(useSearch(Location)))));
