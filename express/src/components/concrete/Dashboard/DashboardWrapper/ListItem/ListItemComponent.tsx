/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import ToggleSwitch from '@src/components/concrete/Inputs/ToggleSwitch';

type Props = {
  buttonText?: string;
  children?: JSX.Element | JSX.Element[];
  formButtonText?: string;
  handleToggleCollapse: (e?: any) => void;
  handleSave: () => void;
  isToggledCollapsed?: boolean;
  item?: string;
  noBorder?: boolean;
  subtitle?: string;
  title: string;
  toggleId?: string;
};

const ListItemComponent = ({ buttonText, children, formButtonText, handleToggleCollapse, handleSave, isToggledCollapsed, item, noBorder, subtitle, title, toggleId }: Props) => (
  <div>
    <div className={css(!toggleId ? margin.top_3 : padding.topbottom_3)}>
      <div className={css(styles.itemTopLineContainer)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
          {toggleId ? (
            <div className={css(margin.right_3)}>
              <EnclosingLabel id={toggleId}>
                <Translatable content={{ transKey: title }}>
                  <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
                </Translatable>
              </EnclosingLabel>
              <div className={css(margin.top_0_5)}>
                <Translatable content={{ transKey: subtitle }}>
                  <div className={css(pagestyles.text, margin.all_0)} />
                </Translatable>
              </div>
            </div>
          ) : (
            <Translatable content={{ transKey: title }}>
              <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
            </Translatable>
          )}
        </div>
        {buttonText &&
          <div className={css(pagestyles.textNoWrap, pagestyles.tableCellMiddle)}>
            <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
              <div className={css(styles.linkContainer)}>
                <Translatable content={{ transKey: !isToggledCollapsed ? buttonText : 'common.cancel' }}>
                  <InteractionButton action={handleToggleCollapse} />
                </Translatable>
              </div>
            </div>
          </div>
        }
        {toggleId &&
          <div className={css(pagestyles.tableCellMiddle)}>
            <ToggleSwitch
              id={toggleId}
              onChange={handleToggleCollapse}
              value={isToggledCollapsed}
            />
          </div>
        }
      </div>
      {((toggleId && isToggledCollapsed) || (!toggleId && !buttonText)) ? (
        <React.Fragment>
          {children}
        </React.Fragment>
      ) : (buttonText ? (
        <div className={css(margin.top_1, margin.bottom_3)}>
          {!isToggledCollapsed ? (
            <Translatable content={{ transKey: item }}>
              <div className={css(pagestyles.text, margin.all_0)} />
            </Translatable>
          ) : (isToggledCollapsed && (formButtonText || subtitle)) ? (
            <form>
              {subtitle &&
                <div className={css(margin.top_1, margin.bottom_3)}>
                  <Translatable content={{ transKey: subtitle }}>
                    <div className={css(pagestyles.text, margin.all_0)} />
                  </Translatable>
                </div>
              }
              {children}
              <Translatable content={{ transKey: formButtonText ? formButtonText : 'common.save' }}>
                <StyledButton
                  action={handleSave}
                  buttonColor="primary"
                  buttonStyle="updated"
                />
              </Translatable>
            </form>
          ) : (
            <React.Fragment>
              {children}
            </React.Fragment>
          )}
        </div>
      ) : (
        null
      ))}
    </div>
    {!noBorder &&
      <ContentSeparator marginNum={0} />
    }
  </div>
);

ListItemComponent.defaultProps = { isCollapsed: true };

export default ListItemComponent;
