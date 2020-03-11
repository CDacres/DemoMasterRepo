import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import StatefulComponent, { StatefulProps, StatefulState } from '@src/components/base/StatefulComponent';

type Props = StatefulProps & {
  errorMessage: string;
  savingMessage: string;
};
type State = StatefulState & {
  machine: {
    dots: string;
  };
};

class EditSaving extends StatefulComponent<Props, State> {
  protected intervalId;

  constructor(props: Props) {
    super(props);
    this.animateDots = this.animateDots.bind(this);
    this.state = {
      name: '0',
      machine: this.generateState('1'),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.animateDots, 250);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  animateDots() {
    const name = Number(this.state.name) < 3 ? Number(this.state.name) + 1 : 0;
    this.goToState(`${name}`);
  }

  generateState(stateName: string) {
    switch (stateName) {
      case '1':
        return {
          dots: '.',
        };
      case '2':
        return {
          dots: '..',
        };
      case '3':
        return {
          dots: '...',
        };
      default:
        return {
          dots: '',
        };
    }
  }

  render() {
    const { dots } = this.state.machine;
    return (
      <div className={css(styles.savingOverlay, styles.savingOverlayBackground)}>
        {this.props.errorMessage ? (
          <div className={css(styles.savingText)}>
            {this.props.errorMessage}
          </div>
        ) : (
          <div className={css(styles.savingText)}>
            {this.props.savingMessage}
            {dots}
          </div>
        )}
      </div>
    );
  }
}

export default EditSaving;
