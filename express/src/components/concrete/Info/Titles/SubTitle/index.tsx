import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { RightSidebar } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  subtitle: string;
};

const SubTitle = ({ subtitle }: Props) => (
  <div className={css(margin.top_2, margin.top_4_large)}>
    <div className={css(styles.wrapper)}>
      <div>
        <div>
          <RightSidebar>
            {matches => {
              if (matches) {
                return (
                  <div className={css(styles.title, padding.topbottom_0_25)}>
                    <div>
                      <Translatable content={{ transKey: subtitle }}>
                        <p />
                      </Translatable>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={css(pagestyles.subtitle, margin.all_0, padding.topbottom_0_25)}>
                    <div>
                      <Translatable content={{ transKey: subtitle }}>
                        <p />
                      </Translatable>
                    </div>
                  </div>
                );
              }
            }}
          </RightSidebar>
        </div>
      </div>
    </div>
  </div>
);

export default SubTitle;
