import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Constants
import { MEETING, OFFICE } from '@src/constants/verticalTypes';

// Helpers
import { ColorHelper } from '@src/helpers';

// Components
import { MaroonLine, OrangeLine, YellowLine } from '@src/components/concrete/Icons/svgs';

type Props = {
  verticalId: number;
};

class SvgLine extends React.PureComponent<Props> {
  colorHelper = new ColorHelper();

  render() {
    const { verticalId } = this.props;
    const color = this.colorHelper.getVerticalColors()[verticalId];
    return (
      <div
        className={css(styles.svgLineContainer, pagestyles.smallerRow)}
        style={{ color: color }}
      >
        {verticalId === MEETING ? (
          <MaroonLine stylesArray={[styles.svgLine]} />
        ) : (verticalId === OFFICE ? (
          <OrangeLine stylesArray={[styles.svgLine]} />
        ) : (
          <YellowLine stylesArray={[styles.svgLine]} />
        ))}
      </div>
    );
  }
}

export default SvgLine;
