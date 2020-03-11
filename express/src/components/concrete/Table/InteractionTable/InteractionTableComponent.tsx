/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

type Props = {
  headerItems: JSX.Element[];
  onScroll: () => void;
  rowItems: JSX.Element[];
  wrapperStyle: {
    left: boolean;
    right: boolean;
  };
};

const InteractionTableComponent = React.forwardRef<HTMLDivElement, Props>(({ headerItems, onScroll, rowItems, wrapperStyle }: Props, ref) => (
  <div className={css(pagestyles.relativePosition)}>
    <div className={css(styles.container)}>
      <div
        className={css(styles.inner)}
        onScroll={onScroll}
        ref={ref}
      >
        <table className={css(styles.table, pagestyles.smallText, pagestyles.fontMedium)}>
          <thead>
            {headerItems.map(headerItem => (
              headerItem
            ))}
          </thead>
          <tbody>
            {rowItems.map(rowItem => (
              rowItem
            ))}
          </tbody>
        </table>
        <div className={css(styles.blankWrapper)}>
          <div className={css(styles.blankItem)}>
            <div />
          </div>
          <div className={css(styles.blank)} />
        </div>
      </div>
      <div className={css(styles.shadow, styles.leftSide, wrapperStyle.left ? pagestyles.block : null)} />
      <div className={css(styles.shadow, styles.rightSide, wrapperStyle.right ? pagestyles.block : null)} />
    </div>
  </div>
));

export default InteractionTableComponent;
