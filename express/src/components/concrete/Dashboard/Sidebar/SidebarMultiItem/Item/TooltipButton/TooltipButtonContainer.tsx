import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

// Components
import TooltipButtonComponent from '@src/components/concrete/Dashboard/Sidebar/SidebarMultiItem/Item/TooltipButton/TooltipButtonComponent';

type Props = {
  clickOutsideActive?: boolean;
  text: string;
} & InjectedOnClickOutProps;

type State = {
  disabled: boolean;
  hovered: boolean;
  tooltipOpened: boolean;
};

class TooltipButtonContainer extends React.Component<Props , State> {
  static defaultProps = { clickOutsideActive: false };

  constructor(props: Props) {
    super(props);
    this.state = {
      disabled: false,
      hovered: false,
      tooltipOpened: false,
    };
  }

  toggleButton = (): void => {
    if (this.state.tooltipOpened) {
      this.setState({
        disabled: true,
        hovered: false,
      });
    } else {
      this.setState({ disabled: false });
    }
  }

  handleClick = (): void => {
    this.setState({ tooltipOpened: !this.state.tooltipOpened }, this.toggleButton);
  }

  handleMouseOverOut = (): void => {
    this.setState({ hovered: !this.state.hovered });
  }

  handleClickOutside = () => {
    if (this.state.tooltipOpened) {
      this.handleClick();
      this.handleMouseOverOut();
    }
  }

  render() {
    const { text } = this.props;
    const { disabled, hovered, tooltipOpened } = this.state;
    return (
      <TooltipButtonComponent
        disabled={disabled}
        hovered={hovered}
        onClick={this.handleClick}
        onMouseOut={this.handleMouseOverOut}
        onMouseOver={this.handleMouseOverOut}
        text={text}
        tooltipOpened={tooltipOpened}
      />
    );
  }
}

export default onClickOutside(TooltipButtonContainer);
