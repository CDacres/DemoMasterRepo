/* tslint:disable:max-line-length */
import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import Head from 'next/head';
import { css } from 'aphrodite/no-important';
import LazyLoad from 'react-lazyload';
import shortid from 'shortid';
import { JSONLD, Generic } from 'react-structured-data';

// Styles
import { pagestyles } from '@src/styles';

// Data
import { browsePagesData, primaryCitiesData, secondaryCitiesData, verticalsData } from '@src/data/home';

// Connectors
import { useConfig, useLang } from '@src/store/connectors';

// Helpers
import { ColorHelper, TranslationHelper } from '@src/helpers';

// Redux stuff
import { fetchTags } from '@src/store/modules/search/tags';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import PageTemplate from '@src/components/base/PageTemplate';
import LandingTitle from '@src/components/concrete/LandingTitle';
import SearchBar from '@src/components/concrete/SearchBar';
import Carousel, { LargeOption, SmallOption } from '@src/components/concrete/Carousel';
import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import CallToAction from '@src/components/concrete/CallToAction';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

// Types
import { Store } from '@src/typings/types';
import withLegacy from '@src/components/pagebuilders/legacy';

type Props = PageProps & {
  config: Store.Config;
  lang: Store.Lang;
  reduxStore: ReduxStore<any>;
  req: Request;
};

class Index extends React.Component<Props, {}> {
  colorHelper = new ColorHelper();
  translationHelper = new TranslationHelper({ messages: this.props.lang });

  meta = {
    json_desc: this.translationHelper.get('meta.home.json_desc'),
    latitude: this.props.config.defaultLocation.lat,
    longitude: this.props.config.defaultLocation.lon,
  };

  verticals = verticalsData[this.props.config.language];
  browsePages = browsePagesData[this.props.config.language];

  static async getInitialProps({ state: { redux }, req }: Ctx) {
    const isServer = !!req;
    const stateGenerator = await initStateGenerator(isServer, redux, req);
    await stateGenerator.addAsyncStateGenerators(fetchTags());
    await stateGenerator.generate();
    return {};
  }

  renderPrimaryCities = () => {
    const { config: { language } } = this.props;
    return Object.keys(primaryCitiesData[language]).map((cityName, index) => {
      const city = primaryCitiesData[language][cityName];
      return (
        <LazyLoad
          key={shortid.generate()}
          offset={index === 0 ? -100 : 100}
          placeholder={<LoadingAnimation />}
        >
          <div key={shortid.generate()}>
            <CardsGrid
              sectionSubtitle={city.subtitle}
              sectionTitle={city.title}
            >
              {city.data.map(card => {
                const color = this.colorHelper.getVerticalColors()[card.verticalId];
                return (
                  <Card
                    key={shortid.generate()}
                    newTab={false}
                    {...card}
                  >
                    <CardContent
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
          </div>
        </LazyLoad>
      );
    });
  }

  renderSecondaryCities = () => {
    const { config: { language } } = this.props;
    return Object.keys(secondaryCitiesData[language]).map(cityName => {
      const city = secondaryCitiesData[language][cityName];
      return (
        <LazyLoad
          key={shortid.generate()}
          offset={100}
          placeholder={<LoadingAnimation />}
        >
          <div>
            <Carousel
              id={cityName}
              isSlider={true}
              options={city.data}
              optionTemplate={LargeOption}
              sectionSubtitle={city.subtitle}
              sectionTitle={city.title}
              type="large"
            />
          </div>
        </LazyLoad>
      );
    });
  }

  render() {
    const { config: { phone: { phoneNumberDisplay } } } = this.props;
    return (
      <PageTemplate>
        <Head>
          <meta
            content={`${this.meta.latitude}; ${this.meta.longitude}`}
            name="geo.position"
          />
          <meta
            content={this.meta.latitude}
            property="og:latitude"
          />
          <meta
            content={this.meta.longitude}
            property="og:longitude"
          />
          <JSONLD dangerouslyExposeHtml={true}>
            <Generic
              jsonldtype="Organization"
              schema={{
                name: 'Zipcube',
                description: this.meta.json_desc,
                url: 'https://www.zipcube.com/',
                sameAs: [
                  'https://www.facebook.com/Zipcube',
                  'https://twitter.com/Zipcube',
                ],
                logo: 'https://www.zipcube.com/apple-icon-114x114.png',
                image: 'https://www.zipcube.com/apple-icon-114x114.png',
              }}
              type="Organization"
            >
              <Generic
                jsonldtype="ContactPoint"
                schema={{
                  telephone: phoneNumberDisplay,
                  contactType: 'customer service',
                }}
                type="contactPoint"
              />
            </Generic>
          </JSONLD>
        </Head>
        <div className={css(pagestyles.container)}>
          <LandingTitle withZipcubeHeading={true} />
          <SearchBar />
          <div>
            <LazyLoad
              offset={100}
              placeholder={<LoadingAnimation />}
            >
              <div>
                <Carousel
                  id="verticals"
                  isSlider={true}
                  options={this.verticals.data}
                  optionTemplate={SmallOption}
                  sectionSubtitle={this.verticals.subtitle}
                  sectionTitle={this.verticals.title}
                />
              </div>
            </LazyLoad>
            <LazyLoad placeholder={<LoadingAnimation />}>
              <div>
                <Carousel
                  id="browse_pages"
                  isSlider={true}
                  options={this.browsePages.data}
                  optionTemplate={LargeOption}
                  sectionSubtitle={this.browsePages.subtitle}
                  sectionTitle={this.browsePages.title}
                  type="large"
                />
              </div>
            </LazyLoad>
            {this.renderPrimaryCities()}
            <LazyLoad placeholder={<LoadingAnimation />}>
              <div>
                <CallToAction />
              </div>
            </LazyLoad>
            {this.renderSecondaryCities()}
          </div>
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(useConfig(useLang(Index)));
