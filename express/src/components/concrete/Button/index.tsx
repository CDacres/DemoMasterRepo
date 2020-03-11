/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import BrowserLink from '@src/components/abstract/Link';

// Types
import { ActionLink, ButtonProps } from '@src/typings/types';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  icon?: JSX.Element | JSX.Element[];
  role?: 'button' | 'checkbox' | 'tab';
  stylesArray?: object[];
} & ActionLink & ButtonProps;

const Button: React.FunctionComponent<Props> = ({ action, children, disabled, href, icon, id, role, stylesArray, type }) => (
  <React.Fragment>
    {typeof href !== 'undefined' ? (
      <BrowserLink
        className={css(styles.button, stylesArray)}
        href={href}
        prefetch={true}
        role={role}
      >
        {children}
      </BrowserLink>
    ) : (
      <button
        className={css(styles.button, stylesArray)}
        disabled={disabled}
        name="button"
        onClick={typeof action !== undefined ? action : () => ({})}
        type={type}
        {...(id ? { id: id } : {})}
        {...(role ? { role: role } : {})}
      >
        {icon &&
          icon
        }
        {children}
      </button>
    )}
  </React.Fragment>
);

Button.defaultProps = {
  role: 'button',
  type: 'button',
};

export default Button;
