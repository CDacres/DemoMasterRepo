/* tslint:disable:max-line-length */
import * as React from 'react';
import { Store as ReduxStore } from 'redux';
import { Request } from 'express';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import { lineheight, margin, pagestyles } from '@src/styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import withLegacy from '@src/components/pagebuilders/legacy';
import PageTemplate from '@src/components/base/PageTemplate';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';
import BodyText from '@src/components/concrete/BodyText';
import HelpSection from '@src/components/concrete/HelpSection';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Types
import { Store } from '@src/typings/types';

type Props = PageProps & {
  config: Store.Config;
  reduxStore: ReduxStore<any>;
  request: Request;
};

declare const window: {
  hubspot: any;
};

class Contact extends React.Component<Props, {}> {

  readonly address = [
    'Zipcube Ltd',
    'Melbray Mews',
    'London',
    'SW6 3NG',
    'UK',
  ];

  static async getInitialProps({ state: { redux }, req }: Ctx): Promise<object> {
    const isServer = !!req;
    await initStateGenerator(isServer, redux, req);
    return {};
  }

  renderAddress = () => this.address.map((addressLine, index) => {
    return (
      <React.Fragment key={shortid.generate()}>
        {index !== 0 &&
          <br />
        }
        {addressLine}
      </React.Fragment>
    );
  })

  initHSChat = () => {
    if (typeof window !== 'undefined') {
      window.hubspot.messages.EXPERIMENTAL_API.requestWidgetOpen();
    }
  }

  render() {
    const { config: { countryCode, phone: { phoneNumber, phoneNumberDisplay } } } = this.props;
    return (
      <PageTemplate>
        <div className={css(pagestyles.container, margin.topbottom_5)}>
          <GenericHeader
            stylesArray={[pagestyles.h1Small]}
            tag="h1"
            text="contact.contact_title"
          />
          <BodyText>
            <Translatable content={{ transKey: 'contact.contact_subtitle' }}>
              <p />
            </Translatable>
            <p className={css(lineheight.lineHeightMedium)}>
              <strong>
                <Translatable content={{ transKey: 'contact.contact_call' }} />
                :
              </strong>
              <br />
              <InteractionLink
                attributes={{ title: { transKey: 'common.phone_display', count: 1, replacements: { phoneNumber: phoneNumberDisplay } } }}
                className={css(pagestyles.link)}
                tel={phoneNumber}
              >
                {phoneNumberDisplay}
              </InteractionLink>
              <br />
              <Translatable content={{ transKey: 'contact.contact_opening_times' }} />
              <br />
              <Translatable content={{ transKey: 'contact.contact_opening_days' }} />
            </p>
            <p className={css(lineheight.lineHeightMedium)}>
              <strong>
                <Translatable content={{ transKey: 'contact.contact_email' }} />
                :
              </strong>
              <br />
              <InteractionLink
                className={css(pagestyles.link)}
                mail="info@zipcube.com"
              >
                <span>
                  info@zipcube.com
                </span>
              </InteractionLink>
              <br />
              <Translatable content={{ transKey: 'common.or' }} />
              <br />
              <InteractionLink
                action={this.initHSChat}
                attributes={{ title: { transKey: 'common.start_a_chat' } }}
                className={css(pagestyles.link)}
              >
                <Translatable content={{ transKey: 'common.start_a_chat' }} />
              </InteractionLink>
            </p>
            <p className={css(lineheight.lineHeightMedium)}>
              <strong>
                <Translatable content={{ transKey: 'contact.contact_live_chat' }} />
                :
              </strong>
              <br />
              <Translatable content={{ transKey: 'contact.contact_live_chat_text' }} />
              <br />
              <Translatable content={{ transKey: 'contact.contact_opening_times' }} />
              <br />
              <Translatable content={{ transKey: 'contact.contact_opening_days' }} />
            </p>
            <Translatable content={{ transKey: 'contact.contact_hour_text' }}>
              <p />
            </Translatable>
            {countryCode === 'gb' &&
              <p>
                {this.renderAddress()}
              </p>
            }
            <HelpSection />
          </BodyText>
        </div>
      </PageTemplate>
    );
  }
}

export default withLegacy(useConfig(Contact));
