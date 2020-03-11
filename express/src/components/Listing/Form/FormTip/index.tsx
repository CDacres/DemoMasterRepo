import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import QuestionPop from '@src/components/Listing/Form/QuestionPop';

// Types
import { FormTipProps } from '@src/components/Listing/Form';

const FormTip = ({ tip, tipPopup }: FormTipProps) => (
  <React.Fragment>
    {!!tip &&
      <div className={css(styles.tip)}>
        <span>
          {tip}
        </span>
        {!!tipPopup &&
          <QuestionPop content={tipPopup} />
        }
      </div>
    }
  </React.Fragment>
);

export default FormTip;
