/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

type Props = {
  borderColor?: string;
  borderRadius?: string;
  borderStyle?: string;
  borderWidth?: string;
  boxShadow?: string;
  children?: JSX.Element | JSX.Element[];
  customStyle?: object;
  padding?: string;
};

const GenericCard: React.FunctionComponent<Props> = ({ borderColor, borderRadius, borderStyle, borderWidth, boxShadow, children, customStyle, padding }) => (
  <div
    style={{
      borderColor: `${borderColor}`,
      borderRadius: `${borderRadius}`,
      borderStyle: `${borderStyle}`,
      borderWidth: `${borderWidth}`,
      boxShadow: `${boxShadow}`,
      padding: `${padding}`,
    }}
    {...(customStyle ? { className: css(customStyle) } : {})}
  >
    {children}
  </div>
);

GenericCard.defaultProps = {
  borderColor: '#ebebeb',
  borderRadius: '4px',
  borderStyle: 'solid',
  borderWidth: '1px',
  boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.05)',
  padding: '24px',
};

export default GenericCard;
