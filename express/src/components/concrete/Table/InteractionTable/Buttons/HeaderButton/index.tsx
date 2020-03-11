import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import TableButton from '@src/components/concrete/Table/InteractionTable/Buttons/TableButton';

// Types
import { ActionLink, ButtonProps } from '@src/typings/types';

type Props = {
  isWhite?: boolean;
  text: string;
} & ActionLink & ButtonProps;

const HeaderButton = ({ action, href, isWhite, text }: Props) => (
  <div className={css(pagestyles.tableCellMiddle)}>
    <div>
      <div className={css(margin.left_2)}>
        <div className={css(pagestyles.textNoWrap)}>
          <span>
            <TableButton
              action={action}
              href={href}
              isWhite={isWhite}
              text={text}
            />
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderButton;
