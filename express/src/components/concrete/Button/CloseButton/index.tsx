import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { Close } from '@src/components/concrete/Icons/svgs';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  autoFocus?: boolean;
  closeStyle?: object[];
  customStyle?: object[];
} & ActionLink;

class CloseButton extends React.Component<Props> {
  static defaultProps = { autoFocus: false };

  protected button;

  constructor(props: Props) {
    super(props);
    this.button = React.createRef();
  }

  componentDidMount() {
    const { autoFocus } = this.props;
    if (autoFocus) {
      this.button.current.focus();
    }
  }

  render() {
    const { action, closeStyle, customStyle } = this.props;
    return (
      <button
        className={css(styles.button, customStyle ? customStyle : null)}
        onClick={action}
        ref={this.button}
      >
        <Close
          role="img"
          stylesArray={[closeStyle ? closeStyle : [pagestyles.icon, pagestyles.icon30, pagestyles.iconBlack]]}
        />
      </button>
    );
  }
}

export default CloseButton;
