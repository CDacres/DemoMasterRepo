import * as React from 'react';

// Components
import InteractionTableComponent from '@src/components/concrete/Table/InteractionTable/InteractionTableComponent';

type Props = {
  headerItems: JSX.Element[];
  rowItems: JSX.Element[];
};

class InteractionTableContainer extends React.Component<Props> {
  wrapperElement = null;

  componentDidMount = () => {
    this.forceUpdate();
  }

  refCallback = (element) => {
    if (element) {
      this.wrapperElement = element;
    } else {
      this.wrapperElement = null;
    }
  }

  scrollTable = () => {
    this.forceUpdate();
  }

  calculateWrapperStyle = (): { left: boolean; right: boolean } => {
    let leftShadow = false;
    let rightShadow = false;
    if (this.wrapperElement !== null) {
      const scrollPosition = this.wrapperElement.scrollLeft;
      const elementWidth = this.wrapperElement.clientWidth;
      const scrollAmount = (this.wrapperElement.scrollWidth - scrollPosition);
      const scrollRemaining = (scrollAmount - elementWidth);
      if (scrollPosition > 0) {
        leftShadow = true;
      }
      if (scrollRemaining !== 0) {
        rightShadow = true;
      }
    }
    return {
      left: leftShadow,
      right: rightShadow,
    };
  }

  render() {
    const { headerItems, rowItems } = this.props;
    const wrapperStyle = this.calculateWrapperStyle();
    return (
      <InteractionTableComponent
        headerItems={headerItems}
        onScroll={this.scrollTable}
        ref={this.refCallback}
        rowItems={rowItems}
        wrapperStyle={wrapperStyle}
      />
    );
  }
}

export default InteractionTableContainer;
