import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  columnCount: 3 | 4;
  image: JSX.Element;
  imageFirst: boolean;
  text: JSX.Element;
};

const ImageColumnLayout = ({ columnCount, image, imageFirst, text }: Props) => {
  const threeColImage = (
    <div className={css(pagestyles.tableCell, pagestyles.halfColumn)}>
      {image}
    </div>
  );

  const fourColImage = (
    <div className={css(styles.remaining, pagestyles.tableCell)}>
      {image}
    </div>
  );

  const colText = (
    <div className={css(styles.remaining, pagestyles.tableCellMiddle)}>
      {text}
    </div>
  );

  const colSpacer = (
    <div className={css(styles.block, pagestyles.tableCell, padding.leftright_1)} />
  );

  return (
    <div className={css(styles.wrapper)}>
      {columnCount === 3 ? (
        <React.Fragment>
          {imageFirst ? (
            <React.Fragment>
              {threeColImage}
              {colSpacer}
              {colText}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {colText}
              {colSpacer}
              {threeColImage}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {imageFirst ? (
            <React.Fragment>
              {fourColImage}
              {colSpacer}
              {colText}
              {colSpacer}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {colText}
              {colSpacer}
              {fourColImage}
              {colSpacer}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default ImageColumnLayout;
