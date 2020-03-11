/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import cardStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  icon: JSX.Element;
  link: string;
  title: string;
};

const SmallMenuCard = ({ icon, link, title }: Props) => (
  <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, pagestyles.thirdColumnLargeScreen, padding.leftright_1)}>
    <div>
      <BrowserLink
        className={css(styles.smallCardaccountLink, margin.topbottom_1, margin.leftright_0, padding.all_3)}
        href={link}
      >
        <div>
          <div className={css(margin.bottom_1)}>
            {icon}
          </div>
        </div>
        <div className={css(cardStyles.firstTitleContainer, margin.bottom_1)}>
          <div className={css(cardStyles.secondTitleContainer)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div>
                <Translatable content={{ transKey: title }}>
                  <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)} />
                </Translatable>
              </div>
            </div>
          </div>
        </div>
      </BrowserLink>
    </div>
  </div>
);

export default SmallMenuCard;
