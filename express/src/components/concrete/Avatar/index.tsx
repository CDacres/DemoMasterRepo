import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Circle from '@src/components/concrete/Circle';

// Utils
import { getInitials } from '@src/utils';

type Props = {
  children?: JSX.Element | JSX.Element[];
  customStyle?: object;
  height?: string;
  name?: {
    firstName?: string;
    lastName?: string;
  };
  needsMargin?: boolean;
  src?: string;
  width?: string;
};

const Avatar: React.FunctionComponent<Props> = ({ children, customStyle, height, name, needsMargin, src, width }) => {
  const username = `${name.firstName ? name.firstName : ''} User Profile`; // TODO: translation key
  const initials = getInitials([name.firstName, name.lastName]);
  let colorKey = Math.ceil((initials.charAt(0).charCodeAt(0) - 65) / 2);
  if (colorKey > 13) {
    colorKey = 0;
  }
  return (
    <React.Fragment>
      <div className={css(pagestyles.tableCellMiddle)}>
        <div
          style={{
            height: `${height}`,
            width: `${width}`,
            display: 'block',
            position: 'relative',
          }}
          {...(needsMargin ? { className: css(margin.bottom_0_5) } : {})}
        >
          {src ? (
            <img
              alt={username}
              className={css(styles.image, customStyle ? customStyle : null)}
              height="100%"
              src={src}
              title={username}
              width="100%"
            />
          ) : (
            <Circle
              height={height}
              stylesArray={[styles.text, styles[`initials_${colorKey}`], customStyle ? customStyle : null]}
              text={initials}
              width={width}
            />
          )}
        </div>
      </div>
      {children}
    </React.Fragment>
  );
};

Avatar.defaultProps = {
  height: '64px',
  name: {
    firstName: '',
    lastName: '',
  },
  needsMargin: true,
  width: '64px',
};

export default Avatar;
