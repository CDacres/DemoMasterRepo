import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onClick: (e: any) => void;
  onScroll: boolean;
  text: string;
};

const MenuItem = ({ onClick, onScroll, text }: Props) => (
  <span {...(!onScroll ? { className: css(pagestyles.fontMedium) } : {})}>
    <Translatable content={{ transKey: text }}>
      <Button
        action={onClick}
        stylesArray={[styles.button, onScroll ? pagestyles.fontMedium : styles.normal]}
      />
    </Translatable>
  </span>
);

export default MenuItem;
