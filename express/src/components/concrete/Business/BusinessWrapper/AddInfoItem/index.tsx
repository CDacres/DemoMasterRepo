import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { PlusLine } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onClick: () => void;
  text: string;
};

const AddInfoItem = ({ onClick, text }: Props) => (
  <React.Fragment>
    <div className={css(padding.topbottom_3)}>
      <div>
        <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
          <Button
            action={onClick}
            stylesArray={[styles.button, pagestyles.link, padding.all_0]}
          >
            <div className={css(styles.wrapper)}>
              <div className={css(styles.container)}>
                <div className={css(margin.right_1)}>
                  <PlusLine stylesArray={[pagestyles.icon, pagestyles.icon16]} />
                </div>
              </div>
              <div className={css(styles.container)}>
                <Translatable content={{ transKey: text }}>
                  <div />
                </Translatable>
              </div>
            </div>
          </Button>
        </span>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </React.Fragment>
);

export default AddInfoItem;
