/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  children?: JSX.Element;
  collapsed?: boolean;
  collapseItem?: JSX.Element;
  firstButtonEvent?: () => void;
  firstButtonText?: string;
  learnMoreLink?: string;
  secondButtonEvent?: () => void;
  secondButtonText?: string;
  singular?: boolean;
  text?: string;
  title?: string;
};

const DashboardItem = ({ children, collapsed, collapseItem, firstButtonEvent, firstButtonText, learnMoreLink, secondButtonEvent, secondButtonText, singular, text, title }: Props) => (
  <div className={css(!singular ? styles.wrapper : [pagestyles.column, pagestyles.fullColumnSmallScreen])}>
    <section>
      <div className={css(pagestyles.noBottomBorder, padding.top_4, padding.bottom_0)}>
        {title &&
          <SubtitleItem text={title} />
        }
        {text &&
          <div className={css(pagestyles.text, margin.all_0)}>
            <span>
              <Translatable content={{ transKey: text }} />
              {learnMoreLink &&
                <div className={css(pagestyles.inline, margin.left_1)}>
                  <BrowserLink
                    className={css(pagestyles.link, pagestyles.linkUnderlined)}
                    href={learnMoreLink}
                  >
                    <Translatable content={{ transKey: 'common.learn_more' }} />
                  </BrowserLink>
                </div>
              }
            </span>
          </div>
        }
      </div>
    </section>
    {!singular &&
      <div className={css(margin.top_2)}>
        <span />
      </div>
    }
    {children &&
      <React.Fragment>
        <div className={css(padding.topbottom_3)}>
          <div className={css(styles.childContainer)}>
            {children}
          </div>
        </div>
        <ContentSeparator marginNum={0} />
      </React.Fragment>
    }
    {collapsed &&
      <div className={css(margin.top_3)}>
        <div>
          <div className={css(styles.input)}>
            <div className={css(margin.top_3)}>
              {collapseItem}
            </div>
          </div>
        </div>
      </div>
    }
    {(firstButtonText && firstButtonEvent) &&
      <React.Fragment>
        {singular ? (
          <div className={css(margin.top_3)}>
            <div className={css(styles.wrapper)}>
              <div className={css(margin.topbottom_3)}>
                <Translatable content={{ transKey: firstButtonText }}>
                  <StyledButton
                    action={firstButtonEvent}
                    buttonColor="primary"
                    buttonStyle="updated"
                  />
                </Translatable>
                {(secondButtonText && secondButtonEvent) &&
                  <div className={css(pagestyles.inlineBlock, margin.left_2)}>
                    <Translatable content={{ transKey: secondButtonText }}>
                      <StyledButton
                        action={secondButtonEvent}
                        buttonStyle="updated"
                      />
                    </Translatable>
                  </div>
                }
              </div>
            </div>
          </div>
        ) : (
          <div className={css(margin.topbottom_3)}>
            <Translatable content={{ transKey: firstButtonText }}>
              <StyledButton
                action={firstButtonEvent}
                buttonColor="primary"
                buttonStyle="updated"
              />
            </Translatable>
            {(secondButtonText && secondButtonEvent) &&
              <div className={css(pagestyles.inlineBlock, margin.left_2)}>
                <Translatable content={{ transKey: secondButtonText }}>
                  <StyledButton
                    action={secondButtonEvent}
                    buttonStyle="updated"
                  />
                </Translatable>
              </div>
            }
          </div>
        )}
      </React.Fragment>
    }
  </div>
);

export default DashboardItem;
