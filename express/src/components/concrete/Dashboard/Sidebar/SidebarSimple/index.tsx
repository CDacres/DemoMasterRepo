import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import sidebarStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  icon: JSX.Element;
  text: string;
  title: string;
};

const SidebarSimple = ({ text, title, icon }: Props) => (
  <GenericCard
    borderColor="#e4e4e4"
    borderRadius="none"
    boxShadow="none"
    customStyle={sidebarStyles.inner}
    padding="0px 24px"
  >
    <section>
      <div className={css(margin.topbottom_4)}>
        {icon}
        <div className={css(margin.topbottom_2)}>
          <SubtitleItem
            smaller={true}
            text={title}
          />
        </div>
        <Translatable content={{ transKey: text }}>
          <div className={css(pagestyles.text, margin.all_0)} />
        </Translatable>
      </div>
    </section>
  </GenericCard>
);

export default SidebarSimple;
