/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';

type Props = {
  current: number;
  customStyle?: object;
  data: Array<{
    label: string;
    number: string;
  }>;
  handleClick: (num: number) => void;
};

const ProgressBarComponent = ({ current, customStyle, data, handleClick }: Props) => (
  <div className={css(styles.wrapper)}>
    <div className={css(styles.container)}>
      <div className={css(styles.inner)}>
        <ul
          className={css(styles.list, margin.leftright_0)}
          id="progress-bar"
        >
          {data.map((item, index) => {
            if (current < index) {
              return (
                <li
                  className={css(styles.listItem, customStyle ? customStyle : styles.defaultWidth)}
                  key={index}
                >
                  <Button
                    action={() => handleClick(index)}
                    stylesArray={[styles.button, padding.all_0]}
                  >
                    <span>
                      {item.label}
                    </span>
                    <br />
                    <span>
                      {item.number}
                    </span>
                  </Button>
                </li>
              );
            } else {
              return (
                <li
                  className={css(styles.listItem, styles.listItemActive, customStyle ? customStyle : styles.defaultWidth)}
                  key={index}
                >
                  <Button
                    action={() => handleClick(index)}
                    stylesArray={[styles.button, padding.all_0]}
                  >
                    <span className={css(styles.textActive)}>
                      {item.label}
                    </span>
                    <br />
                    <span className={css(styles.textActive)}>
                      {item.number}
                    </span>
                  </Button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  </div>
);

export default ProgressBarComponent;
