/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { FullScreenModal } from '@src/components/abstract/MediaQuery';
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  href?: string;
  linkText?: string;
  title: string;
};

const InlineTitle = ({ href, linkText, title }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <ContentSeparator marginNum={0} />
    <div className={css(padding.topbottom_3)}>
      <div className={css(pagestyles.pageContainerTextAlignSmall)}>
        <div className={css(margin.topbottom_1, margin.topbottom_3_small, margin.topbottom_5_large)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <div className={css(pagestyles.column, pagestyles.twelfthColumnSmallScreen, pagestyles.twelfthColumnLargeScreen, padding.leftright_1)} />
            <div className={css(pagestyles.column, pagestyles.fiveSixthsColumnSmallScreen, pagestyles.fiveSixthsColumnLargeScreen, padding.leftright_1)}>
              <div>
                <FullScreenModal>
                  {matches => {
                    if (matches) {
                      return (
                        <div className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0)}>
                          <div>
                            <Translatable content={{ transKey: title }}>
                              <p />
                            </Translatable>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className={css(pagestyles.titleLarge, pagestyles.fontBlack, margin.all_0)}>
                          <div>
                            <Translatable content={{ transKey: title }}>
                              <p />
                            </Translatable>
                          </div>
                        </div>
                      );
                    }
                  }}
                </FullScreenModal>
              </div>
              {(href && linkText) &&
                <div className={css(margin.top_2, margin.top_3_large)}>
                  <div className={css(pagestyles.text, margin.all_0)}>
                    <BrowserLink
                      className={css(pagestyles.link, pagestyles.linkUnderlined)}
                      href={href}
                    >
                      <Translatable content={{ transKey: linkText }} />
                    </BrowserLink>
                  </div>
                </div>
              }
            </div>
            <div className={css(pagestyles.column, pagestyles.twelfthColumnSmallScreen, pagestyles.twelfthColumnLargeScreen, padding.leftright_1)} />
          </div>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </SectionInner>
);

export default InlineTitle;
