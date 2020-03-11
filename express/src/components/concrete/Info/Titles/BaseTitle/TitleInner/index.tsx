/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  hasSetLetterSpacing?: boolean;
  hasSetWidth?: boolean;
  stylesArray?: object[];
  title: string;
};

const TitleInner = ({ hasSetLetterSpacing, hasSetWidth, stylesArray, title }: Props) => (
  <Translatable content={{ transKey: title }}>
    <div className={css(styles.title, stylesArray, hasSetWidth ? styles.setWidth : null, hasSetLetterSpacing ? styles.setLetterSpacing : null)} />
  </Translatable>
);

export default TitleInner;
