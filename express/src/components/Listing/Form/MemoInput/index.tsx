import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Strip from '@src/components/Listing/Layout/Strip';

type Props = {
  errors?: string[];
  height?: string | number;
  name: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: React.ReactNode;
  value: string | number | string[];
};

const MemoInput = ({ errors, height, onChange, placeholder, value }: Props) => (
  <Strip
    className={css(styles.container, (errors && errors.length > 0) && styles.containerError)}
    height={height}
    itemsVert="stretch"
  >
    <textarea
      className={css(styles.textArea, styles.grid)}
      onChange={onChange}
      value={value || ''}
    />
    {(!value && !!placeholder) &&
      <div className={css(styles.placeholder, styles.grid)}>
        {placeholder}
      </div>
    }
  </Strip>
);

export default MemoInput;
