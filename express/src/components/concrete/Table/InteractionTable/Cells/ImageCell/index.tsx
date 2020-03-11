/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { Camera } from '@src/components/concrete/Icons/svgs';
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  href: string;
  secondText?: string;
  src?: string;
  text: string;
};

const ImageCell = ({ href, secondText, src, text }: Props) => (
  <div>
    <BrowserLink
      className={css(pagestyles.linkGrey)}
      href={href}
    >
      <div className={css(styles.wrapper)}>
        <div className={css(pagestyles.tableCellMiddle)}>
          <div className={css(styles.imgContainer)}>
            {src ? (
              <div className={css(styles.imgContent)}>
                <div
                  className={css(styles.img)}
                  role="img"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
            ) : (
              <div className={css(styles.iconWrapper)}>
                <Camera stylesArray={[pagestyles.icon, pagestyles.icon30]} />
              </div>
            )}
          </div>
        </div>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
          <div className={css(margin.leftright_2)}>
            <div>
              <Translatable content={{ transKey: text }}>
                <div className={css(margin.all_0)} />
              </Translatable>
              {secondText &&
                <Translatable content={{ transKey: secondText }}>
                  <div className={css(margin.all_0)} />
                </Translatable>
              }
            </div>
          </div>
        </div>
      </div>
    </BrowserLink>
  </div>
);

export default ImageCell;
