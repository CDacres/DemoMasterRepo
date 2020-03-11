import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';

// Components
import Segment from '@src/components/concrete/ProgressBar/Segment';

type Step = {
  component: JSX.Element;
  incompleteMessage?: string;
  isComplete: boolean;
  name: string;
};
type Props = {
  activeStep: number;
  onClick: (stepNo: number) => void;
  steps: Step[];
};

class ProgressBar extends React.PureComponent<Props> {
  renderSegments = () => this.props.steps.map(({ incompleteMessage, isComplete, name }, idx) => {
    const stepNo = idx + 1;
    return (
      <Segment
        activeStep={this.props.activeStep}
        incompleteMessage={incompleteMessage}
        isComplete={isComplete}
        isCurrent={this.props.activeStep === stepNo}
        key={shortid.generate()}
        setStep={this.setStep}
        stepNo={stepNo}
        title={name}
      />
    );
  })

  setStep = stepNo => {
    if (this.props.onClick) {
      this.props.onClick(stepNo);
    }
  }

  render() {
    return (
      <ul className={css(styles.wizardBar)}>
        {this.renderSegments()}
      </ul>
    );
  }
}

export default ProgressBar;
