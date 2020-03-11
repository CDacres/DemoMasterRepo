import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import panelStyles from '../../../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';

type Props = {
  children: JSX.Element;
  subtitle?: string;
  title: string;
};

const FilterPanelItemInner = ({ children, subtitle, title }: Props) => (
  <div className={css(pagestyles.noBottomBorder, padding.top_0, padding.bottom_2)}>
    <div className={css(panelStyles.tableWrapper)}>
      <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
        <div className={css(margin.right_3)}>
          <EnclosingLabel>
            <Translatable content={{ transKey: title }}>
              <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
            </Translatable>
          </EnclosingLabel>
          {subtitle &&
            <div className={css(margin.top_0_5)}>
              <Translatable content={{ transKey: subtitle }}>
                <div className={css(pagestyles.smallText, margin.all_0)} />
              </Translatable>
            </div>
          }
        </div>
      </div>
      <div className={css(pagestyles.tableCellTop)}>
        <div className={css(panelStyles.rightElementContainer)}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default FilterPanelItemInner;
