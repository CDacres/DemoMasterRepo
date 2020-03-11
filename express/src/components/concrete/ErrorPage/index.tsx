/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';

// Data
import { links } from '@src/data/error/links';

type Props = {
  error: string;
  src: string;
  subtitle: string;
};

const ErrorPage = ({ error, src, subtitle }: Props) => (
  <div className={css(pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.pageContainerChangeableWidthSmall, pagestyles.pageContainerChangeableWidthLarge, pagestyles.pageContainerWithSelectors, pagestyles.pageContainerWithSelectorsWithContent, padding.leftright_1_5, padding.leftright_3_small)}>
    <div className={css(pagestyles.largerRow, pagestyles.clearfix, margin.topbottom_6)}>
      <div className={css(styles.wrapper, pagestyles.tableCellMiddle, padding.leftright_1_5)}>
        <GenericHeader
          stylesArray={[styles.title, margin.top_0, padding.topbottom_0]}
          tag="h1"
          text="error.error_title"
        />
        <GenericHeader
          stylesArray={[styles.subtitle, padding.topbottom_0]}
          tag="h2"
          text={subtitle}
        />
        <GenericHeader
          stylesArray={[styles.error, padding.topbottom_0]}
          tag="h6"
          text={error}
        />
        <ul className={css(styles.list, padding.left_0)}>
          <Translatable content={{ transKey: 'error.error_link_title' }}>
            <li />
          </Translatable>
          <React.Fragment>
            {links.map(item => (
              <li key={item.id}>
                <BrowserLink
                  className={css(styles.link)}
                  href={item.href}
                >
                  <Translatable content={{ transKey: item.text }} />
                </BrowserLink>
              </li>
            ))}
          </React.Fragment>
        </ul>
      </div>
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <div className={css(styles.wrapper, pagestyles.tableCellMiddle, pagestyles.centeredText, padding.leftright_1_5)}>
                <img
                  alt="Info deny image"
                  className={css(styles.img)}
                  height="428"
                  src={src}
                  width="313"
                />
              </div>
            );
          }
          return null;
        }}
      </ProductLargeScreen>
    </div>
  </div>
);

export default ErrorPage;
