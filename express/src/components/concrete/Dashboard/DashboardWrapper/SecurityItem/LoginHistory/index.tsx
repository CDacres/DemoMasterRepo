/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import { Screen } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  currentSession?: boolean;
  onLogout: () => void;
  subtitle: string;
};

const LoginHistory = ({ currentSession, onLogout, subtitle }: Props) => (
  <div>
    <div className={css(pagestyles.smallerRow, pagestyles.clearfix)}>
      <div className={css(pagestyles.column, pagestyles.sixthColumn, pagestyles.twelfthColumnLargeScreen, pagestyles.columnFloat, padding.leftright_0_5)}>
        <div className={css(styles.iconContainer)}>
          <Screen stylesArray={[pagestyles.icon, pagestyles.icon30]} />
        </div>
      </div>
      <div className={css(pagestyles.column, pagestyles.fiveSixthsColumn, pagestyles.elevenTwelfthsColumnLargeScreen, pagestyles.columnFloat, padding.leftright_0_5)}>
        <div className={css(pagestyles.noBottomBorder, padding.topbottom_3)}>
          <div className={css(pagestyles.flexWrapper)}>
            <div className={css(pagestyles.flexContainer)}>
              <span className={css(pagestyles.text, margin.all_0)}>
                <Translatable content={{ transKey: 'dashboard.session' }}>
                  <span className={css(pagestyles.text, margin.all_0)} />
                </Translatable>
                {currentSession &&
                  <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
                    <div className={css(styles.sessionWrapper)}>
                      <div className={css(pagestyles.inlineBlockMiddle, margin.right_0_5)}>
                        <Translatable content={{ transKey: 'dashboard.current_session' }}>
                          <div className={css(styles.sessionInner, pagestyles.tableCell, padding.leftright_0_75)} />
                        </Translatable>
                      </div>
                    </div>
                  </div>
                }
              </span>
            </div>
            <div className={css(pagestyles.inlineBlockMiddle)}>
              <span className={css(pagestyles.text, margin.all_0)}>
                <InteractionButton action={onLogout}>
                  <Translatable content={{ transKey: 'dashboard.logout_device' }}>
                    <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
                  </Translatable>
                </InteractionButton>
              </span>
            </div>
          </div>
          <div className={css(margin.top_1)}>
            <div className={css(pagestyles.smallText, margin.all_0)}>
              <Translatable content={{ transKey: subtitle }}>
                <span className={css(pagestyles.text, margin.all_0)} />
              </Translatable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </div>
);

export default LoginHistory;
