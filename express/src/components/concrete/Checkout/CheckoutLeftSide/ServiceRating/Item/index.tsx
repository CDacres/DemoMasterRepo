/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import InteractionLink from '@src/components/concrete/InteractionLink';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  isLast: boolean;
  selected: boolean;
  text: number;
} & ActionLink;

const Item = ({ action, isLast, selected, text }: Props) => (
  <InteractionLink
    action={action}
    className={css(pagestyles.linkBlack)}
  >
    <li
      className={css(styles.serviceRatingItem, selected ? styles.ratingSelected : null, isLast ? padding.all_1 : [padding.topbottom_1, padding.leftright_1_5])}
      id={text.toString()}
    >
      {text}
    </li>
  </InteractionLink>
);

export default Item;
