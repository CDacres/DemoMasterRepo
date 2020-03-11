import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Connectors
import { useConfig } from '@src/store/connectors';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import GenericHeader from '@src/components/concrete/GenericHeader';
import MobileAccountTab from '@src/components/concrete/Dashboard/CardMenu/MenuMobile/MobileAccountTab';

// utils
import { ArrayHelper } from '@src/helpers';

const MenuMobile = (props) => {
  const { config: { languageName }, dataItems, title } = props;
  const mobileData = new ArrayHelper(dataItems.filter(d => d.mobile === true)).sortByObjectProperty('mobileOrder');
  return (
    <div className={css(styles.mobilePageContainer, margin.bottom_3, margin.leftright_3)}>
      <div className={css(margin.bottom_2)}>
        <div className={css(styles.titleContainer)}>
          <GenericHeader
            stylesArray={[styles.titleMobile, margin.all_0, padding.all_0]}
            tag="h5"
            text={title}
          />
        </div>
      </div>
      <main className={css(pagestyles.relativePosition)}>
        {mobileData.map((data, index) => (
          <MobileAccountTab
            isFirst={index === 0}
            key={index}
            link={data.link}
            subtitle={data.subtitle}
            title={data.title}
          />
        ))}
        <div>
          <div className={css(styles.secondButtonContainer, margin.bottom_3)}>
            <div className={css(styles.thirdButtonContainer, margin.left_0_5)}>
              <BrowserLink
                className={css(styles.button, margin.all_0)}
                href="/" // TODO: correct link
              >
                <span className={css(styles.buttonText)}>
                  {languageName}
                </span>
              </BrowserLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default useConfig(MenuMobile);
