/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import LinkWrapper from '@src/components/concrete/LinkWrapper';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  buttonText?: string;
  href?: string;
  image?: string;
  imageAltText?: string;
  subtitle?: string;
  tel?: string;
  title?: string;
} & ActionLink;

declare const window: {
  hubspot: any;
};

class CallToAction extends React.PureComponent<Props> {
  initHSChat = () => {
    if (typeof window !== 'undefined') {
      window.hubspot.messages.EXPERIMENTAL_API.requestWidgetOpen();
    }
  }

  render() {
    const { action, buttonText, href, image, imageAltText, subtitle, tel, title } = this.props;
    return (
      <div>
        <div className={css(margin.top_3)} />
        <span style={{ fontSize: '0px' }} />
        <div className={css(styles.ctaWrapper)}>
          <div className={css(styles.ctaContainer, pagestyles.clearfix)}>
            <div className={css(styles.ctaTextContainer)}>
              <div className={css(margin.bottom_1)}>
                <div className={css(styles.ctaTitleContainer, padding.topbottom_0_25)}>
                  <Translatable content={{ transKey: title ? title : 'calltoaction.title' }} />
                </div>
              </div>
              <div className={css(margin.bottom_2)}>
                <div className={css(styles.ctaSubtitleContainer)}>
                  <Translatable content={{ transKey: subtitle ? subtitle : 'calltoaction.help' }} />
                </div>
              </div>
              <LinkWrapper
                action={action ? action : this.initHSChat}
                aria-busy="false"
                attributes={{ title: { transKey: buttonText ? buttonText : 'calltoaction.button_text' } }}
                className={css(styles.ctaButton, padding.topbottom_1_5, padding.leftright_3)}
                href={href}
                rel="noopener noreferrer"
                tel={tel}
              >
                <Translatable content={{ transKey: buttonText ? buttonText : 'calltoaction.button_text' }}>
                  <span className={css(styles.ctaButtonText)} />
                </Translatable>
              </LinkWrapper>
            </div>
            <div className={css(styles.ctaImage)}>
              <Translatable attributes={{ alt: { transKey: imageAltText ? imageAltText : 'calltoaction.help' } }}>
                <img
                  height="auto"
                  src={image ? image : 'https://b3e8ad0e9daf313b8ff3-7e7a49cb7469371b50cda1478c4c5dd3.ssl.cf3.rackcdn.com/639_428_d875d683384844087380c776f6c222ff.jpg'}
                  width="100%"
                />
              </Translatable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CallToAction;
