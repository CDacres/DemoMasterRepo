import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import inputStyles from '../styles';
import { pagestyles } from '@src/styles';

// Components
import Icon from '@src/components/concrete/Inputs/Icon';
import Label from '@src/components/concrete/Inputs/Label';
import { Person } from '@src/components/concrete/Icons/svgs';

type Props = {
  id: string;
  label?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommit?: VoidFunction;
  value: string;
};

const UserInput = ({ id, label, name, onChange, onCommit, value }: Props) => (
  <React.Fragment>
    {label &&
      <Label text={label} />
    }
    <Icon>
      <Person stylesArray={[pagestyles.icon, pagestyles.iconGrey]} />
    </Icon>
    <div className={css(inputStyles.inputWrapper)}>
      <div className={css(inputStyles.inputContainer)}>
        <input
          aria-label={label}
          autoComplete="off"
          className={css(inputStyles.input)}
          id={id}
          name={name}
          onChange={onChange}
          onKeyDown={e => {
            if (e.keyCode === 13 && onCommit) {
              onCommit();
            }
          }}
          placeholder={label}
          type="text"
          value={typeof value !== 'undefined' ? value : ''}
        />
      </div>
    </div>
  </React.Fragment>
);

export default UserInput;
