/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import itemStyles from '../styles';
import radioStyles from '../../../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';

// Types
import { Radio } from '@src/typings/types';

type Props = {
  text: string;
} & Radio;

const ItemText = ({ boldText, learnMoreAction, radioPosition, subtext, text }: Props) => (
  <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
    {boldText ? (
      <React.Fragment>
        {radioPosition === 'left' ? (
          <div className={css(radioStyles.textContainer, pagestyles.fontMedium, margin.left_2)}>
            <Translatable content={{ transKey: text }} />
            {subtext &&
              <div className={css(styles.description, margin.top_0_5, margin.right_10_large)}>
                <div>
                  <Translatable content={{ transKey: subtext }} />
                  {learnMoreAction &&
                    <div className={css(pagestyles.inlineBlock, margin.left_0_5)}>
                      <Translatable content={{ transKey: 'common.learn_more' }}>
                        <InteractionButton action={learnMoreAction} />
                      </Translatable>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        ) : (
          // no example found yet of right radio with border and bold text...
          null
        )}
      </React.Fragment>
    ) : (
      <div className={css(itemStyles.textContent)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
          <Translatable content={{ transKey: text }}>
            <div className={css(radioStyles.textContainer)} />
          </Translatable>
          {subtext &&
            <Translatable content={{ transKey: subtext }}>
              <div className={css(styles.subtitleText, padding.top_0_5)} />
            </Translatable>
          }
        </div>
      </div>
    )}
  </div>
);

export default ItemText;
