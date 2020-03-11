/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import { LearnMore } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';
import Tooltip from '@src/components/concrete/Dashboard/Sidebar/SidebarMultiItem/Item/TooltipButton/Tooltip';

type Props = {
  disabled: boolean;
  hovered: boolean;
  onClick: () => void;
  onMouseOut: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseOver: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  text: string;
  tooltipOpened: boolean;
};

const TooltipButtonComponent = ({ disabled, hovered, onClick, onMouseOut, onMouseOver, text, tooltipOpened }: Props) => (
  <React.Fragment>
    <div
      className={css(styles.iconWrapper)}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      <div className={css(pagestyles.block, pagestyles.relativePosition)}>
        <div role="button">
          <Button
            action={onClick}
            stylesArray={[styles.tooltipButton, padding.all_0_25]}
            disabled={disabled}
          >
            <LearnMore stylesArray={[pagestyles.icon, pagestyles.icon16, disabled ? pagestyles.iconLightGrey : hovered ? pagestyles.iconBlue : pagestyles.iconBlack]} />
          </Button>
        </div>
        {tooltipOpened &&
          <Tooltip
            onClick={onClick}
            text={text}
          />
        }
      </div>
    </div>
  </React.Fragment>
);

export default TooltipButtonComponent;
