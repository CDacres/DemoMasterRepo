/* tslint:disable:max-line-length */
import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import Head from 'next/head';
import { Request, Response } from 'express';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Constants
import { ART, DINING, MEETING, OFFICE, PARTY, SPORT, WEDDING } from '@src/constants/verticalTypes';
// ACTIVITY, POPUP

// Styles
import { margin, pagestyles } from '@src/styles';

// Connectors
import { useConfig, useLang, useWidget } from '@src/store/connectors';

// Helpers
import { ColorHelper, TranslationHelper } from '@src/helpers';

// Redux stuff
import { attachReducers } from '@src/store';
import widgetPageReducer, { fetchWidget } from '@src/store/modules/pages/widget';

// Utils
import { handleUrlEncoding, redirect, ucfirst } from '@src/utils';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import withLegacy from '@src/components/pagebuilders/legacy';
import PageTemplate from '@src/components/base/PageTemplate';
import FullBanner from '@src/components/concrete/Banners/FullBanner';
import CardsGrid from '@src/components/concrete/Grid/CardsGrid';
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { withFooter } from '@src/components/abstract/HOCs';

// Types
import { Store, WidgetCardType } from '@src/typings/types';

type Props = PageProps & {
  asPath: string;
  config: Store.Config;
  lang: Store.Lang;
  reduxStore: ReduxStore<any>;
  req: Request;
  res: Response;
  store: ReduxStore<any>;
  url: string;
  widget: Store.Pages.Widget;
};

class Widget extends React.Component<Props, {}> {
  colorHelper = new ColorHelper();
  translationHelper = new TranslationHelper({ messages: this.props.lang });

  static async getInitialProps({ asPath, state: { redux }, req, res }: Ctx) {
    const isServer = !!req;

    const { config: { domain, defaultSlug } } = redux.getState();
    const baseUrl = handleUrlEncoding(isServer ? req.url : asPath);
    const url = isServer ? `${domain}/${baseUrl}` : baseUrl;

    const stateGenerator = await initStateGenerator(isServer, redux, req);

    attachReducers(redux, { pages: { widget: widgetPageReducer } });

    // Run initial actions through root epic and bind to state generator
    try {
      await stateGenerator.addAsyncStateGenerators(fetchWidget(url));
      await stateGenerator.generate();
    } catch (e) {
      const redirectUrl = `/${defaultSlug}`;
      const mobileRedirectUrl = redirectUrl;
      redirect(res, { domain, mobileRedirectUrl, redirectUrl });
      return {};
    }
    return {};
  }

  componentDidMount() {
    const { store } = this.props;

    // Attach reducers for a second time on the client-side
    attachReducers(store, { pages: { widget: widgetPageReducer } });
  }

  renderCityVerticalCards = (cityVertical): JSX.Element => {
    return (
      <CardsGrid>
        {cityVertical.map(card => {
          const color = this.colorHelper.getVerticalColors()[card.verticalId];
          return (
            <Card
              cardCount="all"
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
    );
  }

  render() {
    const {
      widget: {
        data: {
          attributes: {
            bannerImg,
            bannerSubtitle,
            bannerTitle,
            cards,
          },
        },
      },
      url,
    } = this.props;
    const meta = {
      title: this.translationHelper.choice('meta.widget.title', 1, { company_name: ucfirst(bannerTitle) }),
    };
    const distinctCities = [...new Set(cards.map(c => c.city))];
    const meeting: WidgetCardType = cards.filter(include => include.verticalId === MEETING);
    const office: WidgetCardType = cards.filter(include => include.verticalId === OFFICE);
    const party: WidgetCardType = cards.filter(include => include.verticalId === PARTY);
    const dining: WidgetCardType = cards.filter(include => include.verticalId === DINING);
    const wedding: WidgetCardType = cards.filter(include => include.verticalId === WEDDING);
    const art: WidgetCardType = cards.filter(include => include.verticalId === ART);
    const sport: WidgetCardType = cards.filter(include => include.verticalId === SPORT);
    // const popup: WidgetCardType = cards.filter(include => include.verticalId === POPUP);
    // const activity: WidgetCardType = cards.filter(include => include.verticalId === ACTIVITY);
    return (
      <PageTemplate>
        <Head>
          <title>
            {meta.title}
          </title>
          <meta
            content={meta.title}
            property="og:title"
          />
          <meta
            content={meta.title}
            name="twitter:title"
          />
        </Head>
        {bannerImg &&
          <FullBanner
            image={bannerImg}
            subtitle={bannerSubtitle}
            title={bannerTitle}
            url={url}
            withZipcubeLogo={true}
          />
        }
        <div className={css(pagestyles.wideContainer)}>
          <div className={css(margin.top_3)}>
            <Translatable content={{ transKey: 'widget.page_info', count: 1, replacements: { company_name: ucfirst(bannerTitle) } }} />
          </div>
          <ContentSeparator marginNum={3} />
          <div id="scroll">
            {distinctCities.map(city => {
              const cityMeeting: WidgetCardType = meeting.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityMeeting.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_meeting' }, sectionTitle: { transKey: 'widget.title_meeting', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityMeeting)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {distinctCities.map(city => {
              const cityOffice: WidgetCardType = office.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityOffice.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_office' }, sectionTitle: { transKey: 'widget.title_office', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityOffice)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {distinctCities.map(city => {
              const cityParty: WidgetCardType = party.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityParty.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_party' }, sectionTitle: { transKey: 'widget.title_party', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityParty)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {distinctCities.map(city => {
              const cityDining: WidgetCardType = dining.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityDining.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_dining' }, sectionTitle: { transKey: 'widget.title_dining', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityDining)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {distinctCities.map(city => {
              const cityWedding: WidgetCardType = wedding.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityWedding.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_wedding' }, sectionTitle: { transKey: 'widget.title_wedding', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityWedding)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {distinctCities.map(city => {
              const cityArt: WidgetCardType = art.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityArt.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_art' }, sectionTitle: { transKey: 'widget.title_art', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityArt)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {distinctCities.map(city => {
              const citySport: WidgetCardType = sport.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {citySport.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_sport' }, sectionTitle: { transKey: 'widget.title_sport', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(citySport)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {/* {distinctCities.map(city => {
              const cityPopup: WidgetCardType = popup.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityPopup.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_popup' }, sectionTitle: { transKey: 'widget.title_popup', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityPopup)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })}
            {distinctCities.map(city => {
              const cityActivity: WidgetCardType = activity.filter(include => include.city === city);
              return (
                <React.Fragment key={shortid.generate()}>
                  {cityActivity.length > 0 &&
                    <Translatable attributes={{ sectionSubtitle: { transKey: 'widget.subtitle_activity' }, sectionTitle: { transKey: 'widget.title_activity', count: 1, replacements: { city_name: city } } }}>
                      {this.renderCityVerticalCards(cityActivity)}
                    </Translatable>
                  }
                </React.Fragment>
              );
            })} */}
          </div>
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(withFooter(useConfig(useLang(useWidget(Widget))), { squashed: true }));
