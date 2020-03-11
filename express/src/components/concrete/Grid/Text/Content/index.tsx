import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import textStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
  title: string;
};

const Content = ({ text, title }: Props) => (
  <div className={css(textStyles.cardTextWrapper, pagestyles.column, pagestyles.fiveSixthsColumnLargeScreen)}>
    <div className={css(textStyles.cardTextTitleWrapper)}>
      <div className={css(textStyles.cardTextTitle)}>
        <Translatable content={{ transKey: title }} />
      </div>
    </div>
    <div className={css(textStyles.cardTextText, margin.all_0, padding.topbottom_0)}>
      <Translatable content={{ transKey: text }} />
    </div>
  </div>
);

export default Content;
