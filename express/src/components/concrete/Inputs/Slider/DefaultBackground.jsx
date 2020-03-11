/* eslint-disable quotes, max-len */
import * as React from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';
import { HORIZONTAL, VERTICAL } from './constants/SliderConstants';
import OrientationPropType from './propTypes/OrientationPropType';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  orientation: OrientationPropType
});

const defaultProps = { orientation: HORIZONTAL };

function DefaultBackground({ css, orientation, styles }) {
  return (
    <div
      {...css(styles.DefaultBackground, (orientation === VERTICAL ? styles.DefaultBackground_background__vertical : styles.DefaultBackground_background__horizontal))}
    />
  );
}
DefaultBackground.propTypes = propTypes;
DefaultBackground.defaultProps = defaultProps;

export default withStyles(() => ({
  DefaultBackground: {
    backgroundColor: '#d8d8d8',
    height: '5px',
    width: '100%',
    border: '1px solid #ffffff',
    position: 'relative',
    borderRadius: '3px'
  },

  DefaultBackground_background__horizontal: {
    top: '0px'
  },

  DefaultBackground_background__vertical: {
    width: '4px',
    top: '0px',
    height: '100%'
  }
}))(DefaultBackground);
