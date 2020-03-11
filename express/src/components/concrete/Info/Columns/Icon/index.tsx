import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import Circle from '@src/components/concrete/Circle';

type Props = {
  circleText?: string;
  icon?: JSX.Element;
};

const Icon = ({ circleText, icon }: Props) => (
  <div className={css(margin.top_2)}>
    {circleText ? (
      <Circle
        height="48px"
        stylesArray={[styles.number]}
        text={circleText}
        width="48px"
      />
    ) : (icon ? (
      <React.Fragment>
        {icon}
      </React.Fragment>
    ) : (
      null
    ))}
  </div>
);

export default Icon;
