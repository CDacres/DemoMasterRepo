/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  isDateTime?: boolean;
  isNotes?: boolean;
  text: string | number;
  textColor?: string;
};

const TextCell = ({ isDateTime, isNotes, text, textColor }: Props) => (
  <React.Fragment>
    {isDateTime ? (
      <span className={css(styles.text, margin.all_0)}>
        <time>
          {text}
        </time>
      </span>
    ) : (
      <Translatable content={{ transKey: text.toString() }}>
        <span
          className={css(styles.text, margin.all_0, isNotes ? styles.noteText : null)}
          {...(textColor ? { style: { color: textColor } } : {})}
        />
      </Translatable>
    )}
  </React.Fragment>
);

export default TextCell;
