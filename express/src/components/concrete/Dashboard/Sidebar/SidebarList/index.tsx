import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import Subtitle from '@src/components/concrete/Dashboard/Subtitle';
import ListItem from '@src/components/concrete/Dashboard/Sidebar/SidebarList/ListItem';

type Props = {
  icon: JSX.Element;
  items: Array<{
    href: string;
    text: string;
  }>;
  title: string;
};

const SidebarList = ({ icon, items, title }: Props) => (
  <GenericCard
    boxShadow="none"
    padding="0px"
  >
    <div className={css(margin.all_3)}>
      {icon}
      <section>
        <Subtitle text={title} />
      </section>
      <div className={css(margin.top_4)}>
        {items.map((item, index) => (
          <ListItem
            href={item.href}
            isLast={index === items.length - 1}
            key={index}
            text={item.text}
          />
        ))}
      </div>
    </div>
  </GenericCard>
);

export default SidebarList;
