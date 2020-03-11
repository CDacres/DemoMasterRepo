import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import Button from '@src/components/concrete/Button';

type Props = {
  icon: JSX.Element;
  text: string;
};

const Item = ({ icon, text }: Props) => (
  <React.Fragment>
    <div>
      <span className={css(pagestyles.text, pagestyles.fontMedium)}>
        <Button
          // action={} // TODO: make this a proper action
          stylesArray={[styles.shareButton, padding.all_0]}
        >
          <div className={css(pagestyles.table)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div className={css(margin.right_1)}>
                {icon}
              </div>
            </div>
            <Translatable content={{ transKey: text }}>
              <div className={css(pagestyles.tableCellMiddle)} />
            </Translatable>
          </div>
        </Button>
      </span>
    </div>
    <ContentSeparator marginNum={3} />
  </React.Fragment>
);

export default Item;
