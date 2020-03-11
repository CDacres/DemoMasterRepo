/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import GenericHeader from '@src/components/concrete/GenericHeader';
import ColumnLink from '@src/components/concrete/Info/Columns/ColumnLink';
import DescriptionInner from '@src/components/concrete/Info/Columns/Description/DescriptionInner';
import { CheckItem } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  href?: string;
  linkText?: string;
  points: string[];
  text: string;
  title?: string;
};

const Checklist = ({ href, linkText, points, text, title }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div className={css(pagestyles.row, pagestyles.clearfix)}>
      <div className={css(pagestyles.column, pagestyles.fiveTwelfthsColumnLargeScreen, padding.leftright_1)}>
        <div className={css(margin.bottom_4, margin.bottom_0_large)}>
          {title &&
            <div className={css(margin.bottom_2, margin.bottom_3_small)}>
              <section>
                <GenericHeader
                  stylesArray={[pagestyles.defaultTitle]}
                  tag="h2"
                >
                  <Translatable content={{ transKey: title }}>
                    <div className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)} />
                  </Translatable>
                </GenericHeader>
              </section>
            </div>
          }
          <DescriptionInner text={text} />
          {(href && linkText) &&
            <ColumnLink
              href={href}
              text={linkText}
            />
          }
        </div>
      </div>
      <div className={css(pagestyles.column, pagestyles.twelfthColumnLargeScreen, padding.leftright_1)} />
      <div className={css(pagestyles.column, pagestyles.halfColumnLargeScreen, padding.leftright_1)}>
        {points.map((item, index) => (
          <div
            className={css(margin.bottom_2)}
            key={index}
          >
            <div className={css(pagestyles.inlineBlock, margin.right_2)}>
              <CheckItem stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlue]} />
            </div>
            <Translatable content={{ transKey: item }}>
              <span className={css(pagestyles.description, margin.all_0)} />
            </Translatable>
          </div>
        ))}
      </div>
    </div>
  </SectionInner>
);

export default Checklist;
