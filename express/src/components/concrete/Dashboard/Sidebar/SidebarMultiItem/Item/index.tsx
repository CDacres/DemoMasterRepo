import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';
import TooltipButton from '@src/components/concrete/Dashboard/Sidebar/SidebarMultiItem/Item/TooltipButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  description: string;
  icon: JSX.Element;
  isFirst: boolean;
  title: string;
  tooltipText?: string;
};

const Item = ({ description, icon, isFirst, title, tooltipText }: Props) => (
  <React.Fragment>
    {isFirst ? (
      <React.Fragment>
        {icon}
      </React.Fragment>
    ) : (
      <div className={css(margin.top_3)}>
        {icon}
      </div>
    )}
    <div className={css(margin.topbottom_1)}>
      <SubtitleItem
        smaller={true}
        text={title}
      />
    </div>
    <Translatable content={{ transKey: description }}>
      {isFirst ? (
        <div className={css(pagestyles.text, margin.all_0)} />
      ) : (
        <span className={css(pagestyles.text, margin.all_0)} />
      )}
    </Translatable>
    {tooltipText &&
      <TooltipButton text={tooltipText} />
    }
  </React.Fragment>
);

export default Item;
