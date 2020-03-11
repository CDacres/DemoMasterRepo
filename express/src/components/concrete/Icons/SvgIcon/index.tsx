/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Types
import { Icon } from '@src/typings/types';

const SvgIcon = ({ children, fill, fillOpacity, focusable, path, preserveAspectRatio, role, stroke, strokeLinecap, strokeLinejoin, strokeWidth, style, stylesArray, viewBox }: Icon & React.SVGAttributes<{}>) => (
  <svg
    aria-hidden="true"
    className={css(stylesArray)}
    fill={fill}
    fillOpacity={fillOpacity}
    focusable={focusable ? focusable : 'false'}
    preserveAspectRatio={preserveAspectRatio}
    role={role ? role : 'presentation'}
    stroke={stroke}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    strokeWidth={strokeWidth}
    viewBox={viewBox ? viewBox : '0 0 24 24'}
    {...(!stylesArray ? { style: style } : {})}
  >
    {path ? (
      <path
        d={path}
        fillRule="evenodd"
      />
    ) : (
      <React.Fragment>
        {children}
      </React.Fragment>
    )}
  </svg>
);

export default SvgIcon;
