/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { Check, Spacer } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';

type Props = {
  id?: string;
  label?: string;
  name?: string;
  onChange: () => void;
  value: boolean;
};

const ToggleSwitch: React.FunctionComponent<Props> = ({ id, label, name, onChange, value }) => (
  <Button
    action={onChange}
    aria-checked={value.toString()}
    aria-labelledby={label}
    id={id}
    role="checkbox"
    stylesArray={[styles.uncheckedBackground]}
  >
    <input
      name={name}
      type="hidden"
      value={value.toString()}
    />
    <div className={css(styles.checkedBackground, value ? styles.checkedBackground_on : null)} />
    <div className={css(styles.slider, value ? styles.sliderChecked : null)}>
      <div className={css(styles.iconContainer)}>
        <div className={css(styles.checkmarkCover, value ? styles.checkmarkCover_on : null)} />
        <Check
          stroke="currentColor"
          stylesArray={[styles.strokeIcon]}
        />
      </div>
      <div className={css(styles.iconContainer, styles.times, !value ? styles.times_on : null)}>
        <div className={css(styles.timesScale, !value ? styles.timesScale_on : null)}>
          <Spacer stylesArray={[styles.icon]} />
        </div>
      </div>
    </div>
  </Button>
);

ToggleSwitch.defaultProps = {
  id: 'toggle',
  label: 'Toggle',
  name: 'toggle',
};

export default ToggleSwitch;
