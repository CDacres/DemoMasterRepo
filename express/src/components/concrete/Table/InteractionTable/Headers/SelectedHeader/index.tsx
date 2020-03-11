/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import headerStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import Button from '@src/components/concrete/Button';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  handleCancelClick: () => void;
  handleSaveClick: () => void;
  title: string;
};

const SelectedHeader = ({ handleCancelClick, handleSaveClick, title }: Props) => (
  <div className={css(styles.wrapper, padding.topbottom_1, padding.leftright_3)}>
    <div className={css(headerStyles.blankWrapper, headerStyles.blankHidden)}>
      <div className={css(headerStyles.blankContainer)}>
        <div className={css(headerStyles.blankInner)} />
      </div>
      <div className={css(headerStyles.blank)} />
    </div>
    <div>
      <div className={css(styles.container)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
          <Translatable content={{ transKey: title }}>
            <div className={css(styles.title, pagestyles.title, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)} />
          </Translatable>
        </div>
        <div className={css(pagestyles.tableCellMiddle)}>
          <div className={css(styles.buttonsContainer)}>
            <div className={css(pagestyles.inlineBlock, margin.right_1)}>
              <div>
                <ProductLargeScreen>
                  {matches => {
                    if (matches) {
                      return (
                        <Translatable content={{ transKey: 'common.edit' }}>
                          <StyledButton
                            action={handleSaveClick}
                            buttonColor="whiteNoBorder"
                            buttonStyle="updated"
                          />
                        </Translatable>
                      );
                    }
                    return (
                      <Translatable content={{ transKey: 'common.edit' }}>
                        <Button
                          action={handleSaveClick}
                          stylesArray={[styles.saveButtonSmallScreen, pagestyles.fontMedium]}
                        />
                      </Translatable>
                    );
                  }}
                </ProductLargeScreen>
              </div>
            </div>
            <span>
              <div className={css(pagestyles.inline)}>
                <ProductLargeScreen>
                  {matches => {
                    if (matches) {
                      return (
                        <div className={css(pagestyles.inlineBlock, margin.left_2)}>
                          <Translatable content={{ transKey: 'common.cancel' }}>
                            <Button
                              action={handleCancelClick}
                              stylesArray={[styles.cancelButton, pagestyles.fontMedium, padding.all_0]}
                            />
                          </Translatable>
                        </div>
                      );
                    }
                    return (
                      <div className={css(pagestyles.inlineBlock, margin.left_1)}>
                        <Translatable content={{ transKey: 'common.cancel' }}>
                          <Button
                            action={handleCancelClick}
                            stylesArray={[styles.cancelButton, pagestyles.fontMedium, padding.all_0]}
                          />
                        </Translatable>
                      </div>
                    );
                  }}
                </ProductLargeScreen>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SelectedHeader;
