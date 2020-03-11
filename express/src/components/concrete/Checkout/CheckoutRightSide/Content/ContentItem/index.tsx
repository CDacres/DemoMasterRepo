/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';
import { LearnMore } from '@src/components/concrete/Icons/svgs';

type Props = {
  isClickable?: boolean;
  isFirst?: boolean;
  isTotal?: boolean;
  onClick?: () => void;
  onTooltipClick?: () => void;
  price?: string;
  text: string;
  tooltip?: boolean;
  tooltipClicked?: boolean;
};

const ContentItem = ({ isClickable, isFirst, isTotal, onClick, onTooltipClick, price, text, tooltip, tooltipClicked }: Props) => (
  <div className={css(isFirst ? margin.top_0 : margin.top_2)}>
    <div className={css(styles.container)}>
      <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
        <Translatable content={{ transKey: text }}>
          <span
            className={css(pagestyles.text, margin.all_0, isTotal ? pagestyles.fontBlack : null, isClickable ? pagestyles.link : null)}
            onClick={onClick}
          />
        </Translatable>
        <span className={css(margin.left_1)}>
          {tooltip &&
            <div className={css(styles.helpWrapper)}>
              <div className={css(pagestyles.block, pagestyles.relativePosition)}>
                <div>
                  <Button
                    action={onTooltipClick}
                    stylesArray={[styles.helpButton, padding.all_0]}
                  >
                    <LearnMore stylesArray={[pagestyles.icon, pagestyles.icon16, tooltipClicked ? pagestyles.iconBlue : pagestyles.iconBlack]} />
                  </Button>
                </div>
              </div>
            </div>
          }
        </span>
      </div>
      {price &&
        <div className={css(pagestyles.tableCellMiddle)}>
          <div className={css(pagestyles.textNoWrap)}>
            <span className={css(pagestyles.text, margin.all_0, isTotal ? pagestyles.fontBlack : null)}>
              <span>
                {price}
              </span>
            </span>
          </div>
        </div>
      }
    </div>
  </div>
);

export default ContentItem;
