/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import FooterColumn from '@src/components/concrete/Footer/FooterColumn';
import ColumnHeading from '@src/components/concrete/Footer/ColumnHeading';
import SocialIcon from '@src/components/concrete/Footer/SocialIcon';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Facebook, Instagram, Twitter } from '@src/components/concrete/Icons/svgs';
import InteractionLink from '@src/components/concrete/InteractionLink';
import CrossDomainLinks from '@src/components/concrete/CrossDomainLinks';

// Types
import { Store } from '@src/typings/types';

type DataObject = {
  href: string;
  text: string;
};
type Props = {
  config: Store.Config;
  discoverColumn: DataObject[];
  isShowing: boolean;
  joinColumn: DataObject[];
  socialColumn: DataObject[];
  zipcubeColumn: DataObject[];
};

const FooterComponent = ({ config: { footer: { squashed }, phone: { phoneNumber, phoneNumberDisplay }}, discoverColumn, isShowing, joinColumn, socialColumn, zipcubeColumn }: Props) => (
  <div className={css(squashed ? [styles.footerOuter, styles.footerOuter_squashed, isShowing ? styles.footerOuter_squashed_visible : styles.footerOuter_squashed_hidden] : styles.footerOuter)}>
    <div className={css(styles.footerInner)}>
      <footer role="contentinfo">
        <div className={css(styles.fontSettings)}>
          <div className={css(styles.columnsWrapper, pagestyles.row, pagestyles.clearfix)}>
            <FooterColumn>
              <Translatable content={{ transKey: 'Zipcube' }}>
                <ColumnHeading />
              </Translatable>
              <ul className={css(styles.linkList)}>
                {zipcubeColumn}
              </ul>
            </FooterColumn>
            <FooterColumn>
              <Translatable content={{ transKey: 'common.discover' }}>
                <ColumnHeading />
              </Translatable>
              <ul className={css(styles.linkList)}>
                {discoverColumn}
              </ul>
            </FooterColumn>
            <FooterColumn>
              <Translatable content={{ transKey: 'footer.join_zipcube' }}>
                <ColumnHeading />
              </Translatable>
              <ul className={css(styles.linkList)}>
                {joinColumn}
              </ul>
            </FooterColumn>
            <FooterColumn>
              <div className={css(styles.socialIconsContainer)}>
                <SocialIcon href="https://www.facebook.com/zipcube">
                  <Facebook stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />
                </SocialIcon>
                <SocialIcon href="https://twitter.com/zipcube">
                  <Twitter stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />
                </SocialIcon>
                <SocialIcon href="https://instagram.com/zipcubeltd">
                  <Instagram stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />
                </SocialIcon>
                <SocialIcon href="https://blog.zipcube.com">
                  Blog
                </SocialIcon>
              </div>
              <ul className={css(styles.linkList)}>
                {socialColumn}
                <li className={css(margin.bottom_0_5, styles.telephoneNumber)}>
                  Tel:{' '}
                  <InteractionLink
                    attributes={{ title: { transKey: 'common.phone_display', count: 1, replacements: { phoneNumber: phoneNumberDisplay } } }}
                    className={css(pagestyles.link)}
                    tel={phoneNumber}
                  >
                    {phoneNumberDisplay}
                  </InteractionLink>
                </li>
              </ul>
            </FooterColumn>
          </div>
          <div className={css(styles.footerBaseContainer)}>
            <ContentSeparator marginNum={2} />
            <div className={css(styles.table)}>
              <div className={css(pagestyles.tableCellMiddle)}>
                <div className={css(styles.copyrightWrapper)}>
                  <div className={css(styles.footerBaseText)}>
                    © Zipcube Ltd.
                  </div>
                </div>
              </div>
              <div className={css(pagestyles.tableCellMiddle)}>
                <CrossDomainLinks />
              </div>
            </div>
          </div>
          <meta
            content="Zipcube"
            property="name"
          />
          <meta
            content={phoneNumberDisplay}
            property="telephone"
          />
        </div>
      </footer>
    </div>
  </div>
);

export default FooterComponent;
