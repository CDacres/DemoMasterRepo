/* eslint-disable quotes, max-len */
import * as React from 'react';
import { css, withStyles } from 'react-with-styles';

// import { getArrayMode } from '@src/utils';

class Pits extends React.Component {
  constructor() {
    super();
    this.containerHeight = 65;
    this.pitStyleCache = {};
  }

  shouldComponentUpdate(nextProps) {
    const { algorithm, max, min, orientation, pitPoints } = this.props;

    const minMaxChanged = nextProps.min !== min || nextProps.max !== max;
    const orientationChanged = nextProps.orientation !== orientation;
    const algorithmChanged = nextProps.algorithm !== algorithm;
    const pitPointsChanged = nextProps.pitPoints !== pitPoints;

    if (minMaxChanged || pitPointsChanged || orientationChanged || algorithmChanged) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    this.invalidatePitStyleCache();
  }

  invalidatePitStyleCache = () => {
    this.pitStyleCache = {};
  }

  renderPits = () => {
    const { algorithm, max, min, orientation, pitComponent: PitComponent, pitPoints } = this.props;

    const highestCount = pitPoints.sort((a, b) => a.count - b.count).pop();
    const pitUnit = this.containerHeight / highestCount.count;

    const pits = pitPoints.map(({ count, value }) => {
      // console.log(count, value);
      let pitStyle = this.pitStyleCache[value];

      if (!pitStyle) {
        const pos = algorithm.getPosition(value, min, max);
        pitStyle = orientation === 'vertical' ? { top: `${pos}%`, position: 'absolute' } : { left: `${pos}%`, position: 'absolute', height: `${pitUnit}px` };
        this.pitStyleCache[value] = pitStyle;
      } else {
        pitStyle = {
          ...this.pitStyleCache[value],
          height: `${count * pitUnit}px`
        };
        this.pitStyleCache[value] = pitStyle;
      }

      return (
        <PitComponent
          key={value}
          style={pitStyle}
        />
      );
    });

    return {
      containerHeight: this.containerHeight,
      pits
    };
  }

  render() {
    const { styles } = this.props;
    const { containerHeight, pits } = this.renderPits();
    return (
      <div
        style={{ height: containerHeight }}
        {...css(styles.pitContainer)}
      >
        {pits}
      </div>
    );
  }
}

export default withStyles(() => ({
  pitContainer: {
    display: 'block',
    width: '100%'
  }
}))(Pits);
