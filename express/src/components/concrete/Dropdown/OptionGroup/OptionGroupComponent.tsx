import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Option from '@src/components/concrete/Dropdown/OptionGroup/Option';

type Props = {
  chosen: (e: any, isSelected?: boolean) => void;
  options: Array<{
    currency?: string;
    price?: {
      amount: number | string;
      discounted?: number | string;
    };
    selected?: boolean;
    subtitle?: string;
    title: string;
  }>;
};

const OptionGroupComponent = ({ chosen, options }: Props) => (
  <ul className={css(styles.options)}>
    {options.map(option => (
      <Option
        chosen={chosen}
        key={shortid.generate()}
        option={option}
      />
    ))}
  </ul>
);

export default OptionGroupComponent;
