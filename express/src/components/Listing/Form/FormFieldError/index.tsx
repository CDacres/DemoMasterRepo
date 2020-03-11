import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  errors?: string[];
};

const FormFieldError = ({ errors }: Props) => (
  <React.Fragment>
    {(errors && errors.length > 0) &&
      <div className={css(styles.error)}>
        {errors.map((i, k) => (
          <React.Fragment key={k}>
            {k !== 0 &&
              <br />
            }
            <span>
              <Spell word={i} />
            </span>
          </React.Fragment>
        ))}
      </div>
      }
  </React.Fragment>
);

export default FormFieldError;
