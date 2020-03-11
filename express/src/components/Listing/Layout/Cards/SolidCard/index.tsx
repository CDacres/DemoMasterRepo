import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { ellipse, Int } from '@src/core';
import { specs } from '@src/core/ux';

// Styles
import styles from './styles';

// Components
import Anchor from '@src/components/Listing/Buttons/Anchor';
import Column from '@src/components/Listing/Layout/Column';
import Row from '@src/components/Listing/Layout/Row';
import Strip from '@src/components/Listing/Layout/Strip';
import Currency from '@src/components/Listing/Form/Currency';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  currency: string;
  isLarge?: boolean;
  item: string;
  items: Array<{
    description: string;
    orderIndex: Int;
  }>;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
  price: number;
};

const SolidCard = ({ currency, isLarge, item, items, onDelete, onEdit, price }: Props) => (
  <Strip
    height="100%"
    itemsVert="stretch"
    overflow="hidden"
    padding="16px"
    rowGap={isLarge ? '12px' : '8px'}
    rows="auto 1fr auto"
    style={{
      border: specs.boxBorder,
      borderRadius: specs.borderRadius,
    }}
    width="100%"
  >
    <Strip
      cols="1fr auto"
      itemsVert="flex-start"
    >
      <span className={css(styles.text, styles.item)}>
        {item}
      </span>
      <span className={css(styles.item)}>
        <Currency currency={currency} />
        {price}
      </span>
    </Strip>
    <Column gap="8px">
      {ellipse(items.map(i => i.description), 4, (x) => `+ ${x.length}`).map((i, k) => (
        <span
          className={css(styles.text, styles.items)}
          key={k}
        >
          {i}
        </span>
      ))}
    </Column>
    <Row
      crossAlignment="flex-end"
      mainAlignment="flex-end"
    >
      <div>
        <Anchor
          isError={true}
          onClick={onDelete}
        >
          <Spell word="common.delete" />
        </Anchor>
        <Anchor
          onClick={onEdit}
          stylesArray={[styles.editButton]}
        >
          <Spell word="common.edit" />
        </Anchor>
      </div>
    </Row>
  </Strip>
);

export default SolidCard;
