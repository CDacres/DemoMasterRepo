/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import cardStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  icon: JSX.Element;
  link: string;
  subtitle: string;
  title: string;
};

const LargeMenuCard = ({ icon, link, subtitle, title }: Props) => (
  <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, pagestyles.thirdColumnLargeScreen, padding.leftright_1)}>
    <div className={css(styles.accountCard)}>
      <BrowserLink
        className={css(styles.accountLink, margin.topbottom_1, margin.leftright_0, padding.all_3)}
        href={link}
      >
        <div>
          <div className={css(margin.bottom_2)}>
            {icon}
          </div>
        </div>
        <div className={css(cardStyles.firstTitleContainer)}>
          <div className={css(cardStyles.secondTitleContainer)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div>
                <div>
                  <div className={css(pagestyles.inlineBlock)}>
                    <Translatable content={{ transKey: title }}>
                      <span className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
                    </Translatable>
                  </div>
                  <div className={css(styles.arrowContainer, margin.left_0_5)}>
                    <Chevron
                      direction="right"
                      stylesArray={[pagestyles.icon, pagestyles.icon12, pagestyles.iconBlack]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={css(styles.subtitleContainer)}>
            <Translatable content={{ transKey: subtitle }}>
              <div className={css(pagestyles.text, margin.all_0)} />
            </Translatable>
          </div>
        </div>
      </BrowserLink>
    </div>
  </div>
);

export default LargeMenuCard;
