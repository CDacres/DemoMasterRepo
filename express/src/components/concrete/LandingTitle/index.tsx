import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';

type Props = {
  h1?: string;
  h2?: string;
  withZipcubeHeading?: boolean;
};

const LandingTitle = ({ h1, h2, withZipcubeHeading }: Props) => (
  <div className={css(styles.landingTitleWrapper)}>
    <div className={css(styles.landingTitleContainer)}>
      <GenericHeader
        stylesArray={[styles.landingTitle_h1, padding.topbottom_1, margin.topbottom_4]}
        tag="h1"
      >
        {withZipcubeHeading &&
          <span className={css(styles.landingTitle_h1Span, padding.topbottom_1)}>
            Zipcube
          </span>
        }
        <Translatable content={{ transKey: h1 ? h1 : 'home.h1' }}>
          <div />
        </Translatable>
      </GenericHeader>
      <GenericHeader
        stylesArray={[styles.landingTitle_h2, padding.all_0, margin.topbottom_2]}
        tag="h2"
        text={h2 ? h2 : 'home.h2'}
      />
    </div>
  </div>
);

export default LandingTitle;
