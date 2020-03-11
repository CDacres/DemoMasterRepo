import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Error from '@src/components/Listing/Icons/Error';

// Models
import { VenueModel } from '@src/components/Listing/Models';

type Props = {
  index: number;
  model: VenueModel;
  title: React.ReactNode;
};

class StepItem extends React.Component<Props> {

  handleStepChange = (index: number) => () => {
    const { model, model: { currentStep } } = this.props;
    let validPass = true;
    if (currentStep === 0) {
      validPass = model.validateBasicStep();
    } else if (currentStep === 1) {
      validPass = model.validateSpaceStep();
    } else if (currentStep === 3) {
      validPass = model.validateAmenityStep();
    }
    if (validPass) {
      model.changeStep(index);
    }
  }

  render() {
    const { index, model: { currentStep, isNew, stepError }, title } = this.props;
    return (
      <li
        className={css(styles.tab, (index === currentStep) ? styles.current : styles.segment, !isNew && styles.pointer)}
        {...(!isNew ? { onClick: this.handleStepChange(index) } : {})}
      >
        <div className={css(styles.inner)}>
          {title}
        </div>
        {(stepError.length > 0 && stepError.indexOf(index) !== -1) &&
          <div className={css(styles.error)}>
            <div className={css(styles.errorIcon)}>
              <Error />
            </div>
          </div>
        }
      </li>
    );
  }
}

export default StepItem;
