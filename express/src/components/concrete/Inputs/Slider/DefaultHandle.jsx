/* eslint-disable quotes, max-len */
import * as React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';

import { VERTICAL } from './constants/SliderConstants';

import handlePropTypes, { handleDefaultProps } from './propTypes/HandlePropTypes';

export const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  ...handlePropTypes,
  'aria-valuetext': PropTypes.string,
  'aria-label': PropTypes.string
});

const defaultProps = {
  ...handleDefaultProps,
  'aria-valuetext': undefined,
  'aria-label': undefined
};

function DefaultHandle({
  css,
  styles,
  orientation,
  disabled,
  handleRef,
  ...passProps
}) {
  return (
    <button
      ref={handleRef}
      type="button"
      {...css(styles.DefaultHandle_handle, orientation === VERTICAL ? styles.DefaultHandle_handle__vertical : styles.DefaultHandle_handle__horizontal, disabled && styles.DefaultHandle_handle__disabled)}
      {...passProps}
    >
      <div {...css(styles.buttonLine)} />
      <div {...css(styles.buttonLine)} />
      <div {...css(styles.buttonLine)} />
    </button>
  );
}
DefaultHandle.propTypes = propTypes;

DefaultHandle.defaultProps = defaultProps;

export default withStyles(({ rheostat: { color, unit, constants } }) => ({
  DefaultHandle_handle: {
    width: '27px',
    height: '27px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#abe2fb',
    backgroundColor: '#ffffff',
    borderRadius: '27px',
    outline: 'currentColor none medium',
    zIndex: 2,
    boxShadow: '0px 2px 2px #ebebeb',
    marginLeft: '-16px',
    top: '-12px',
    cursor: 'pointer'
  },

  DefaultHandle_handle__horizontal: {
    marginLeft: '-13.5px',
    top: '-10px'
  },

  buttonLine: {
    display: 'inline-block',
    height: '9px',
    width: '1px',
    backgroundColor: '#00c6ff',
    marginLeft: '1px',
    marginRight: '1px'
  },

  DefaultHandle_handle__vertical: {
    marginTop: -(constants.DEFAULT_HANDLE_WIDTH) * unit,
    left: (constants.BACKGROUND_HEIGHT - constants.DEFAULT_HANDLE_WIDTH) * unit,

    ':before': {
      top: 10
    },

    ':after': {
      top: 13,
      left: 8,
      height: 1,
      width: 10
    }
  },

  DefaultHandle_handle__disabled: {
    borderColor: color.buttons.defaultDisabledColor
  }
}))(DefaultHandle);
