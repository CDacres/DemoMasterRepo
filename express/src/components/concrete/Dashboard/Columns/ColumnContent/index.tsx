/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  description: string;
  list: Array<{
    addCheckbox: boolean;
    checked?: boolean;
    disabled?: boolean;
    name: string;
  }>;
  title: string;
};

const ColumnContent = ({ description, list, title }: Props) => (
  <React.Fragment>
    <div className={css(padding.topbottom_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.sevenTwelfthsColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <Translatable content={{ transKey: title }}>
            <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
          </Translatable>
          <div className={css(margin.top_1)}>
            <Translatable content={{ transKey: description }}>
              <div className={css(pagestyles.text, margin.all_0)} />
            </Translatable>
          </div>
        </div>
        <div className={css(pagestyles.column, pagestyles.fiveTwelfthsColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            {list.map(({ addCheckbox, checked, disabled, name }, index) => (
              <div
                className={css(pagestyles.column, pagestyles.columnFloat, pagestyles.thirdColumn, padding.leftright_1)}
                key={index}
              >
                {addCheckbox &&
                  <div className={css(styles.container, margin.top_3)}>
                    <StyledCheckbox
                      checked={checked}
                      disabled={disabled}
                      id={name}
                      name={name}
                    />
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </React.Fragment>
);

export default ColumnContent;
