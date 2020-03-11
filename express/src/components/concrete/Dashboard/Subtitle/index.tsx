/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

// Components
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';

type Props = {
  changesSize?: boolean;
  needsBottomSpace?: boolean;
  smaller?: boolean;
  tag?: 'h1' | 'h3';
  text: string;
};

const Subtitle = ({ changesSize, needsBottomSpace, smaller, tag, text }: Props) => (
  <div className={css(pagestyles.noBottomBorder, padding.top_4, needsBottomSpace ? padding.bottom_3 : padding.bottom_0)}>
    <SubtitleItem
      changesSize={changesSize}
      smaller={smaller}
      tag={tag}
      text={text}
    />
  </div>
);

export default Subtitle;
