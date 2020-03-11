/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  changesSize?: boolean;
  needsPadding?: boolean;
  removeWeight?: boolean;
  smaller?: boolean;
  tag?: 'h1' | 'h3';
  text: string;
};

const SubtitleItem = ({ changesSize, needsPadding, removeWeight, smaller, tag, text }: Props) => (
  <GenericHeader
    stylesArray={[pagestyles.defaultTitle]}
    tag={tag ? tag : 'h1'}
  >
    {smaller ? (
      <Translatable content={{ transKey: text }}>
        <div className={css(pagestyles.subtitle, margin.all_0, !removeWeight ? pagestyles.fontBlack : null, needsPadding ? padding.topbottom_0_25 : null)} />
      </Translatable>
    ) : (changesSize ? (
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <Translatable content={{ transKey: text }}>
                <div className={css(pagestyles.title, margin.all_0, !removeWeight ? pagestyles.fontBlack : null, needsPadding ? padding.topbottom_0_25 : null)} />
              </Translatable>
            );
          }
          return (
            <Translatable content={{ transKey: text }}>
              <div className={css(pagestyles.subtitle, margin.all_0, !removeWeight ? pagestyles.fontMedium : null, needsPadding ? padding.topbottom_0_25 : null)} />
            </Translatable>
          );
        }}
      </ProductLargeScreen>
    ) : (
      <Translatable content={{ transKey: text }}>
        <div className={css(pagestyles.title, margin.all_0, !removeWeight ? pagestyles.fontBlack : null, needsPadding ? padding.topbottom_0_25 : null)} />
      </Translatable>
    ))}
  </GenericHeader>
);

export default SubtitleItem;
