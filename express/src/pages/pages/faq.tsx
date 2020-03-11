import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import { Request } from 'express';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Data
import { toggles } from '@src/data/pages/faq';

// Components
import withLegacy from '@src/components/pagebuilders/legacy';
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import PageTemplate from '@src/components/base/PageTemplate';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Hero from '@src/components/concrete/Hero';
import HeroSection from '@src/components/concrete/Hero/HeroSection';
import HeroText from '@src/components/concrete/Hero/HeroText';
import GenericHeader from '@src/components/concrete/GenericHeader';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import Toggle from '@src/components/concrete/Toggle';
import BodyText from '@src/components/concrete/BodyText';
import HelpSection from '@src/components/concrete/HelpSection';

type Props = PageProps & {
  reduxStore: ReduxStore<any>;
  req: Request;
};

declare const window: {
  hubspot: any;
};

class Faq extends React.Component<Props, {}> {

  static async getInitialProps({ state: { redux }, req }: Ctx): Promise<object> {
    const isServer = !!req;
    await initStateGenerator(isServer, redux, req);
    return {};
  }

  initHSChat = () => {
    if (typeof window !== 'undefined') {
      window.hubspot.messages.EXPERIMENTAL_API.requestWidgetOpen();
    }
  }

  render() {
    return (
      <PageTemplate>
        <Hero backgroundImage="/_express/images/pages/faq/hero-faq.jpg">
          <HeroSection>
            <React.Fragment>
              <GenericHeader
                tag="h1"
                text="faq.faq_heading"
              />
              <Translatable content={{ transKey: 'faq.faq_intro_1' }}>
                <HeroText />
              </Translatable>
              <Translatable content={{ transKey: 'faq.faq_intro_2' }}>
                <HeroText />
              </Translatable>
            </React.Fragment>
          </HeroSection>
          <div className={css(margin.top_4)}>
            <div className={css(pagestyles.inlineBlock)}>
              <div className={css(margin.right_2)}>
                <Translatable content={{ transKey: 'common.start_a_chat' }}>
                  <StyledButton
                    action={this.initHSChat}
                    buttonColor="primary"
                  />
                </Translatable>
              </div>
            </div>
            <div className={css(pagestyles.inlineBlock, padding.top_1)}>
              <Translatable content={{ transKey: 'faq.faq_find_a_space' }}>
                <StyledButton href="/" />
              </Translatable>
            </div>
          </div>
        </Hero>
        <div className={css(pagestyles.container, margin.topbottom_5)}>
          <BodyText>
            {toggles.sections.map((section, index) => (
              <Toggle
                index={index}
                key={shortid.generate()}
                length={toggles.sections.length}
                sectionBody={section.section_body}
                sectionTitle={section.section_title}
              />
            ))}
            <HelpSection />
          </BodyText>
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(Faq);
