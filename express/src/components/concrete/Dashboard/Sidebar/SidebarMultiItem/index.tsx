import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import sidebarStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';
import Item from '@src/components/concrete/Dashboard/Sidebar/SidebarMultiItem/Item';
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  items: Array<{
    description: string;
    icon: JSX.Element;
    tooltipText?: string;
    title: string;
  }>;
  learnMoreLink?: string;
  title: string;
};

const SidebarMultiItem = ({ items, learnMoreLink, title }: Props) => (
  <GenericCard
    borderColor="#e4e4e4"
    borderRadius="none"
    boxShadow="none"
    customStyle={sidebarStyles.inner}
    padding="0px 24px"
  >
    <section>
      <div className={css(margin.topbottom_3)}>
        <SubtitleItem
          smaller={true}
          text={title}
        />
        <div className={css(margin.top_4, margin.bottom_2)}>
          {items.map((item, index) => (
            <Item
              description={item.description}
              icon={item.icon}
              isFirst={index === 0}
              key={index}
              title={item.title}
              tooltipText={item.tooltipText}
            />
          ))}
        </div>
        {learnMoreLink &&
          <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
            <BrowserLink
              className={css(pagestyles.link, pagestyles.linkUnderlined)}
              href={learnMoreLink}
            >
              <Translatable content={{ transKey: 'common.learn_more' }} />
            </BrowserLink>
          </div>
        }
      </div>
    </section>
  </GenericCard>
);

export default SidebarMultiItem;
