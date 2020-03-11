/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import StyledButton from '@src/components/concrete/Button/StyledButton';

type Props = {
  agreeOnClick: () => void;
  buttonText: string;
  detailsOnClick: () => void;
  price: string;
  text: string;
};

const MobileBottomSection = ({ agreeOnClick, buttonText, detailsOnClick, price, text }: Props) => (
  <div>
    <div>
      <div className={css(margin.top_0)}>
        <div className={css(styles.wrapper)}>
          <div className={css(margin.top_6, margin.bottom_2)}>
            <ContentSeparator marginNum={0} />
          </div>
          <div className={css(pagestyles.relativePosition)}>
            <div className={css(margin.leftright_2, margin.bottom_2, margin.top_3)}>
              <div className={css(pagestyles.row, pagestyles.clearfix)}>
                <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                  <span className={css(pagestyles.smallText, pagestyles.fontBlack, margin.all_0)}>
                    <span>
                      {price}
                    </span>
                  </span>
                  {' '}
                  <div className={css(pagestyles.inlineBlock)}>
                    <Translatable content={{ transKey: text }}>
                      <div className={css(pagestyles.smallText, margin.all_0)} />
                    </Translatable>
                  </div>
                  <div>
                    <Translatable content={{ transKey: 'checkout.see_details' }}>
                      <InteractionButton action={detailsOnClick} />
                    </Translatable>
                  </div>
                </div>
                <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                  <div className={css(styles.buttonWrapper)}>
                    <div>
                      <div>
                        <Translatable content={{ transKey: buttonText }}>
                          <StyledButton
                            action={agreeOnClick}
                            buttonColor="primary"
                          />
                        </Translatable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MobileBottomSection;
