import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { StyleMeta } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import FormControlLabel from '@src/components/Listing/Form/FormControlLabel';
import RadioInput from '@src/components/Listing/Form/RadioInput';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  checked: boolean;
  onPressed: VoidFunction;
  style: StyleMeta;
};

const SpaceStyleOption = ({ checked, onPressed, style }: Props) => (
  <div>
    <FormControlLabel
      control={
        <RadioInput
          checked={checked}
          name="style"
          onChange={onPressed}
        />
      }
      label={
        <span className={css(styles.text)}>
          <Spell word={style.description} />
        </span>
      }
    />
  </div>
);

export default SpaceStyleOption;
