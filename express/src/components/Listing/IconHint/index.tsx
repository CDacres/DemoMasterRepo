import * as React from 'react';
import { css } from 'aphrodite/no-important';

// MaterialUI
import { Popover as PopoverUI } from '@material-ui/core';

// Styles
import styles from './styles';

// Components
import CloseButton from '@src/components/Listing/Buttons/CloseButton';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  icon: React.ReactNode;
  text: string;
};

type State = {
  anchor?: HTMLElement;
  open: boolean;
};

class IconHint extends React.Component<Props, State>  {
  state: State = {
    anchor: null,
    open: false,
  };

  handleOpen = (e: any) => {
    this.setState({ anchor: e.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchor: null });
  }

  render() {
    const { icon, text } = this.props;
    const { anchor } = this.state;
    const open = !!anchor;
    return (
      <div>
        <div
          className={css(styles.container)}
          onClick={this.handleOpen}
        >
          {icon}
        </div>
        <PopoverUI
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={this.handleClose}
          open={open}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className={css(styles.close)}>
            <CloseButton onClick={this.handleClose} />
          </div>
          <div>
            <div className={css(styles.text)}>
              <span>
                <Spell word={text} />
              </span>
            </div>
          </div>
        </PopoverUI>
      </div>
    );
  }
}

export default IconHint;
