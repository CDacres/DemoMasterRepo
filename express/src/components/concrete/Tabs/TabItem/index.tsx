/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onClick: () => void;
  panelVisible: boolean;
  title: string;
};

const TabItem = ({ onClick, panelVisible, title }: Props) => (
  <div className={css(pagestyles.inlineBlock)}>
    <Translatable content={{ transKey: title }}>
      <Button
        action={onClick}
        aria-selected={panelVisible}
        aria-busy="false"
        role="tab"
        stylesArray={[styles.tabButton, margin.right_3, padding.topbottom_2, padding.leftright_0, panelVisible ? styles.active : styles.notActive]}
      />
    </Translatable>
  </div>
);

export default TabItem;
