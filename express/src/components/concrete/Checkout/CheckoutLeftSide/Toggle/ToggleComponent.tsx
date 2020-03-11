import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ToggleSwitch from '@src/components/concrete/Inputs/ToggleSwitch';

type Props = {
  id: string;
  onChange: () => void;
  text: string;
  value: boolean;
};

const ToggleComponent = ({ id, onChange, text, value }: Props) => (
  <div className={css(margin.topbottom_4)}>
    <div>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.halfColumnLargeScreen, padding.leftright_1)}>
          <div className={css(padding.topbottom_2)}>
            <div className={css(styles.toggle)}>
              <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                <div className={css(margin.right_3)}>
                  <EnclosingLabel id={id}>
                    <Translatable content={{ transKey: text }}>
                      <span className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                    </Translatable>
                  </EnclosingLabel>
                </div>
              </div>
              <ToggleSwitch
                id={id}
                onChange={onChange}
                value={value}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ToggleComponent;
