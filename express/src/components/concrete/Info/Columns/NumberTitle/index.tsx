import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import TitleInner from '@src/components/concrete/Info/Titles/BaseTitle/TitleInner';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  subtitle: string;
  title: string;
};

const NumberTitle = ({ subtitle, title }: Props) => (
  <div className={css(margin.bottom_3)}>
    <div className={css(pagestyles.pageContainerTextAlignSmall)}>
      <TitleInner title={title} />
      <div className={css(margin.top_1)}>
        <div>
          <div className={css(pagestyles.text, margin.all_0)}>
            <div>
              <Translatable content={{ transKey: subtitle }}>
                <p />
              </Translatable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NumberTitle;
