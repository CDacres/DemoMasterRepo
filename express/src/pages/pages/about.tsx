import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import { Request } from 'express';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import { lineheight, margin, padding, pagestyles } from '@src/styles';

// Data
import { valuesGrid } from '@src/data/pages/about';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import withLegacy from '@src/components/pagebuilders/legacy';
import PageTemplate from '@src/components/base/PageTemplate';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Hero from '@src/components/concrete/Hero';
import HeroSection from '@src/components/concrete/Hero/HeroSection';
import HeroText from '@src/components/concrete/Hero/HeroText';
import GenericHeader from '@src/components/concrete/GenericHeader';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import QuoteBlock from '@src/components/concrete/QuoteBlock';
import ImageAndText from '@src/components/concrete/ImageAndText';
import FramedImage from '@src/components/concrete/FramedImage';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import BodyText from '@src/components/concrete/BodyText';
import Block from '@src/components/concrete/Block';
import Grid from '@src/components/concrete/Grid';
import Text from '@src/components/concrete/Grid/Text';
import Content from '@src/components/concrete/Grid/Text/Content';

// Types
import { Store } from '@src/typings/types';

type Props = PageProps & {
  config: Store.Config;
  reduxStore: ReduxStore<any>;
  req: Request;
};

class About extends React.Component<Props, {}> {

  public gridItems;

  constructor(props: Props) {
    super(props);
    const rows = [];
    for (let i = 0; i < valuesGrid.length; i += 3) {
      const row = valuesGrid.slice(i, i + 3);
      rows.push(row);
    }
    this.gridItems = rows.map(row => {
      return (
        <div
          className={css(pagestyles.gridRow, pagestyles.clearfix)}
          key={shortid.generate()}
        >
          {row.map(rowProps => (
            <Text
              key={shortid.generate()}
              {...rowProps}
            >
              <Content {...rowProps} />
            </Text>
          ))}
        </div>
      );
    });
  }

  static async getInitialProps({ state: { redux }, req }: Ctx): Promise<object> {
    const isServer = !!req;
    await initStateGenerator(isServer, redux, req);
    return {};
  }

  render() {
    return (
      <PageTemplate>
        <Hero backgroundImage="/_express/images/pages/about/hero-aboutus.jpg">
          <HeroSection>
            <React.Fragment>
              <GenericHeader
                stylesArray={[pagestyles.h1SmallScreen]}
                tag="h1"
              >
                <React.Fragment>
                  <Translatable content={{ transKey: 'about.hero_heading' }} />:
                </React.Fragment>
              </GenericHeader>
              <Translatable content={{ transKey: 'about.hero_subheading' }}>
                <HeroText />
              </Translatable>
            </React.Fragment>
          </HeroSection>
          <div className={css(margin.top_4)}>
            <div className={css(pagestyles.inlineBlock)}>
              <div className={css(margin.right_2)}>
                <Translatable content={{ transKey: 'common.book_a_space' }}>
                  <StyledButton
                    buttonColor="primary"
                    href="/"
                  />
                </Translatable>
              </div>
            </div>
            <div className={css(pagestyles.inlineBlock, padding.top_1)}>
              <Translatable content={{ transKey: 'common.visit_your_dashboard' }}>
                <StyledButton href="/dashboard" />
              </Translatable>
            </div>
          </div>
        </Hero>
        <div className={css(pagestyles.container, margin.bottom_5)}>
          <QuoteBlock>
            <span>
              <Translatable content={{ transKey: 'about.quote_block_1' }} />
              <br />
              <Translatable content={{ transKey: 'about.quote_block_2' }} />
            </span>
          </QuoteBlock>
          <ContentSeparator />
          <ImageAndText
            imageComponent={
              <FramedImage
                alt="Zipcube Mobile App"
                src="/_express/images/pages/about/zipcube_mobile_app.jpg"
              />
            }
            textComponent={
              <React.Fragment>
                <div className={css(margin.bottom_1)}>
                  <GenericHeader
                    tag="h2"
                    text="about.image_and_text_title"
                  />
                </div>
                <div className={css(margin.bottom_1)}>
                  <Translatable content={{ transKey: 'about.image_and_text_text' }}>
                    <div className={css(margin.all_0, padding.topbottom_0)} />
                  </Translatable>
                </div>
              </React.Fragment>
            }
          />
          <ContentSeparator />
          <Block
            bottomMargin={true}
            topMargin={true}
          >
            <Grid gridItems={this.gridItems}>
              <React.Fragment>
                <GenericHeader
                  stylesArray={[pagestyles.h1Small]}
                  tag="h1"
                  text="about.values_title"
                />
                <BodyText>
                  <div className={css(margin.top_2)}>
                    <Translatable content={{ transKey: 'about.values_subtitle' }} />
                  </div>
                </BodyText>
              </React.Fragment>
            </Grid>
          </Block>
          <ContentSeparator />
          <Block
            bottomMargin={true}
            topMargin={true}
          >
            <React.Fragment>
              <GenericHeader
                stylesArray={[pagestyles.h1Small]}
                tag="h1"
                text="about.our_team_title"
              />
              <BodyText>
                <React.Fragment>
                  <Translatable content={{ transKey: 'about.our_team_subtitle' }}>
                    <p />
                  </Translatable>
                  <Translatable content={{ transKey: 'about.our_team_text' }}>
                    <p />
                  </Translatable>
                </React.Fragment>
              </BodyText>
            </React.Fragment>
          </Block>
          <ContentSeparator />
          <Block
            bottomMargin={true}
            topMargin={true}
          >
            <React.Fragment>
              <GenericHeader
                stylesArray={[pagestyles.h1Small]}
                tag="h1"
                text="about.where_does_zipcube_come_from_title"
              />
              <BodyText>
                <React.Fragment>
                  <Translatable content={{ transKey: 'about.where_does_zipcube_come_from_inspiration' }}>
                    <p />
                  </Translatable>
                  <div className={css(pagestyles.centeredText)}>
                    <Translatable content={{ transKey: 'about.where_does_zipcube_come_from_combination' }}>
                      <p className={css(pagestyles.aboutTitle, lineheight.lineHeightLarge)} />
                    </Translatable>
                  </div>
                  <Translatable content={{ transKey: 'about.where_does_zipcube_come_from_aims' }}>
                    <p />
                  </Translatable>
                </React.Fragment>
              </BodyText>
            </React.Fragment>
          </Block>
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(useConfig(About));
