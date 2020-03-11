/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  disabled?: boolean;
  onClick: () => void;
  options: Array<{
    text: string;
    value: string;
  }>;
  showSaveMessage: boolean;
  withLocation?: boolean;
};

const PriceAlertItemComponent = ({ disabled, onClick, options, showSaveMessage, withLocation }: Props) => (
  <div className={css(styles.wrapper)}>
    <div>
      <Translatable content={{ transKey: 'business.price_alert_text' }}>
        <div className={css(pagestyles.text, margin.all_0)} />
      </Translatable>
      <div className={css(margin.top_2)}>
        {withLocation ? (
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
              <div className={css(pagestyles.row, pagestyles.clearfix)}>
                <div className={css(pagestyles.column, pagestyles.twoThirdsColumn, pagestyles.columnFloat, padding.leftright_1)}>
                  <StyledInput
                    icon="£"
                    id="amount"
                    name="amount"
                    placeholder="0"
                  />
                  {/* TODO: hardcoded currency */}
                </div>
                <div className={css(pagestyles.column, pagestyles.thirdColumn, pagestyles.columnFloat, padding.leftright_1)}>
                  <StyledInput
                    id="currency"
                    name="currency"
                    selectOptions={options}
                  />
                </div>
              </div>
            </div>
            <div className={css(pagestyles.column, pagestyles.thirdColumn, pagestyles.columnFloat, padding.leftright_1)}>
              <div>
                <div className={css(pagestyles.relativePosition)}>
                  <Translatable attributes={{ placeholder: { transKey: 'common.address_city_placeholder' } }}>
                    <StyledInput
                      id="city"
                      name="city"
                    />
                  </Translatable>
                  {/* TODO: add autocomplete */}
                </div>
              </div>
            </div>
            <div className={css(pagestyles.column, pagestyles.sixthColumn, pagestyles.columnFloat, padding.leftright_1)}>
              <Translatable content={{ transKey: 'common.save' }}>
                <StyledButton
                  action={onClick}
                  buttonColor="primary"
                  buttonStyle="updated"
                  customStyle={[pagestyles.fullColumn]}
                  disabled={disabled}
                />
              </Translatable>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className={css(pagestyles.inlineBlock, margin.right_2)}>
              <div className={css(pagestyles.row, pagestyles.clearfix)}>
                <div className={css(pagestyles.column, pagestyles.twoThirdsColumn, pagestyles.columnFloat, padding.leftright_1)}>
                  <StyledInput
                    icon="£"
                    id="amount"
                    name="amount"
                    placeholder="0"
                  />
                  {/* TODO: hardcoded currency */}
                </div>
                <div className={css(pagestyles.column, pagestyles.thirdColumn, pagestyles.columnFloat, padding.leftright_1)}>
                  <StyledInput
                    id="currency"
                    name="currency"
                    selectOptions={options}
                  />
                </div>
              </div>
            </div>
            <span className={css(styles.buttonWithoutLocation)}>
              <Translatable content={{ transKey: 'common.save' }}>
                <StyledButton
                  action={onClick}
                  buttonColor="primary"
                  buttonStyle="updated"
                  disabled={disabled}
                />
              </Translatable>
            </span>
          </React.Fragment>
        )}
      </div>
      <div>
        {showSaveMessage ? (
          <Translatable content={{ transKey: 'common.saved_message' }}>
            <div className={css(pagestyles.text, pagestyles.fontMedium)} />
          </Translatable>
        ) : (
          <div className={css(pagestyles.text, pagestyles.fontMedium)} />
        )}
      </div>
    </div>
  </div>
);

export default PriceAlertItemComponent;
