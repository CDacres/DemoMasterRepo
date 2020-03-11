/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';

type Props = {
  onClick: () => void;
  text: string;
};

const NavButton = ({ onClick, text }: Props) => (
  <div className={css(pagestyles.inlineBlock)}>
    <div className={css(pagestyles.inlineBlock, pagestyles.relativePosition, margin.topbottom_0, margin.left_1, margin.right_0_5)}>
      <div>
        <Translatable content={{ transKey: text }}>
          <Button
            action={onClick}
            stylesArray={[styles.button]}
          />
        </Translatable>
        <div />
        {/* TODO: button needs sub menu */}
      </div>
    </div>
  </div>
);

export default NavButton;
