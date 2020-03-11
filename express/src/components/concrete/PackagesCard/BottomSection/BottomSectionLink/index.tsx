import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import packageCardStyles from '../../styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InteractionLink from '@src/components/concrete/InteractionLink';

type Props = {
  collapseAction: (e?: any) => void;
  hasCollapseSection: boolean;
  isCollapsed: boolean;
};

const BottomSectionLink = ({ collapseAction, hasCollapseSection, isCollapsed }: Props) => (
  <div className={css(packageCardStyles.priceExtraRight)}>
    {hasCollapseSection &&
      <InteractionLink
        action={collapseAction}
        className={css(pagestyles.link, packageCardStyles.collapsable)}
      >
        <Translatable content={{ transKey: isCollapsed ? 'common.show_less' : 'common.show_more' }} />
      </InteractionLink>
    }
  </div>
);

export default BottomSectionLink;
