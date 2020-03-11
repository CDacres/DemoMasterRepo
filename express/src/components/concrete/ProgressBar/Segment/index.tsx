import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Translatable from '@src/components/abstract/Translatable';

type Props = {
  activeStep: number;
  incompleteMessage?: string;
  isComplete: boolean;
  isCurrent: boolean;
  setStep: (stepNo: string | number) => void;
  stepNo: number;
  title: string;
};

class Segment extends React.PureComponent<Props> {
  static defaultProps = {
    isComplete: false,
    isCurrent: false,
  };

  handleClick = (): void => {
    this.props.setStep(this.props.stepNo);
  }

  render() {
    const { incompleteMessage, isComplete, isCurrent, title } = this.props;
    return (
      <li
        className={css(isCurrent ? styles.wizardBar_segment_current : styles.wizardBar_segment)}
        onClick={this.handleClick}
      >
        <div className={css(styles.wizardBar_segmentInner)}>
          <Translatable content={{ transKey: title }} />
          <br />
          {!isComplete &&
            <span className={css(styles.wizardBar_segmentInner_incompleteText)}>
              {incompleteMessage}
            </span>
          }
        </div>
      </li>
    );
  }
}

export default Segment;
