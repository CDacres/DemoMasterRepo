import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import LargeMenuCard from '@src/components/concrete/Dashboard/CardMenu/MenuDesktop/MenuCards/LargeMenuCard';
import SmallMenuCard from '@src/components/concrete/Dashboard/CardMenu/MenuDesktop/MenuCards/SmallMenuCard';
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { DashboardMenu } from '@src/typings/types';

type Props = {
  dataItems: DashboardMenu[];
  title: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
};

const MenuDesktop = ({ dataItems, title, user }: Props) => (
  <DashboardTemplate>
    <div className={css(margin.top_8, margin.bottom_7, margin.left_2)}>
      <Translatable content={{ transKey: title }}>
        <div className={css(pagestyles.titleLarge, pagestyles.fontBlack, margin.all_0)} />
      </Translatable>
      <div className={css(margin.top_1, margin.bottom_2)}>
        <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
          {user.firstName}{' '}{user.lastName},{' '}
        </span>
        <span className={css(pagestyles.text, margin.all_0)}>
          {user.email}
          {' · '}
        </span>
        <BrowserLink
          className={css(pagestyles.link, pagestyles.leftText)}
          href="/" // TODO: correct link
        >
          <Translatable content={{ transKey: 'dashboard.go_profile' }}>
            <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
          </Translatable>
        </BrowserLink>
      </div>
    </div>
    <div className={css(pagestyles.row)}>
      <div className={css(pagestyles.column, padding.leftright_1)}>
        <div className={css(styles.cardsContainer)}>
          <ProductLargeScreen>
            {matches => {
              if (matches) {
                return (
                  <React.Fragment>
                    {dataItems.map((item, index) => (
                      <LargeMenuCard
                        icon={item.icon}
                        key={index}
                        link={item.link}
                        subtitle={item.subtitle}
                        title={item.title}
                      />
                    ))}
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment>
                  {dataItems.map((item, index) => (
                    <SmallMenuCard
                      icon={item.iconSmall}
                      key={index}
                      link={item.link}
                      title={item.title}
                    />
                  ))}
                </React.Fragment>
              );
            }}
          </ProductLargeScreen>
        </div>
      </div>
    </div>
  </DashboardTemplate>
);

export default MenuDesktop;
