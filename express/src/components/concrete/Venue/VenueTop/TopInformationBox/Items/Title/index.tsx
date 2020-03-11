import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Badge from '@src/components/concrete/Venue/VenueTop/TopInformationBox/Items/Title/Badge';
import GenericHeader from '@src/components/concrete/GenericHeader';
import BrowserLink from '@src/components/abstract/Link';
import TranslateButton from '@src/components/concrete/Button/TranslateButton';

type Props = {
  addTranslationButton?: boolean;
  badges: Array<{
    href: string;
    text: string;
  }>;
  largeTitle: string;
  location: string;
  searchLink: string;
  smallTitle: string;
};

const Title = ({ addTranslationButton, badges, largeTitle, location, searchLink, smallTitle }: Props) => (
  <React.Fragment>
    <div>
      <div className={css(styles.titleWrapper, pagestyles.smallSubtitle, pagestyles.fontMedium, margin.all_0)}>
        <span className={css(styles.smallTitle)}>
          {smallTitle}
        </span>
      </div>
      <div className={css(margin.topbottom_1)}>
        <div itemProp="name">
          <GenericHeader
            stylesArray={[pagestyles.defaultTitle]}
            tag="h1"
          >
            <div className={css(styles.locationWrapper, pagestyles.titleLarge, pagestyles.fontBlack, margin.all_0)}>
              {largeTitle}
            </div>
          </GenericHeader>
        </div>
      </div>
    </div>
    <div className={css(styles.locationWrapper, pagestyles.text, margin.all_0)}>
      <BrowserLink
        className={css(styles.locationText)}
        href={searchLink}
      >
        {location}
      </BrowserLink>
    </div>
    <div className={css(styles.badgeWrapper, margin.top_2)}>
      {badges.map(item => (
        <Badge
          href={item.href}
          key={shortid.generate()}
          text={item.text}
        />
      ))}
    </div>
    {addTranslationButton &&
      <TranslateButton
        blackButton={true}
        buttonText="venue.translate_top_button"
        handleClick={(e) => {
          e.preventDefault();
          // console.log('Page translated');
          // TODO: make this a proper action
        }}
      />
    }
  </React.Fragment>
);

export default Title;
