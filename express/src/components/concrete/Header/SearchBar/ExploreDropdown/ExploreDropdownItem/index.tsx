/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  index: number;
  selected: boolean;
  title: string;
};

const ExploreDropdownItem = ({ index, selected, title }: Props) => (
  <li
    aria-pressed="true"
    aria-selected="false"
    className={css(styles.itemWrapper, margin.right_1, margin.bottom_1)}
    id={`search_explore_${index}`}
    role="button"
    tabIndex={-1}
  >
    <div className={css(styles.itemContainer, padding.topbottom_1_5, padding.leftright_2, selected ? styles.itemContainerSelected : null)}>
      <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
        <Translatable content={{ transKey: title }}>
          <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0, selected ? styles.itemTitleSelected : null)} />
        </Translatable>
      </div>
    </div>
  </li>
);

export default ExploreDropdownItem;
