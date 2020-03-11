import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';

// Types
import { BreadcrumbType } from '@src/typings/types';

type Props = {
  items: BreadcrumbType;
};

const LandingPageCrumbs = ({ items }: Props) => (
  <div className={css(pagestyles.fullColumn, margin.top_1_25)}>
    <div className={css(styles.breadcrumbsWrapper)}>
      <ol className={css(styles.breadcrumbsList, padding.left_0)}>
        {items.map(({ href, text, title }, index) => {
          return (
            <li
              className={css(styles.breadcrumb, (index > 0 ? styles.breadcrumbSubsequent : null))}
              key={index}
            >
              {!href ? (
                <span className={css(styles.breadcrumbChild)}>
                  {text}
                </span>
              ) : (
                <BrowserLink
                  attributes={{ title: { transKey: title } }}
                  className={css(styles.breadcrumbChild, styles.breadcrumbLink)}
                  href={href}
                >
                  {text}
                </BrowserLink>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  </div>
);

export default LandingPageCrumbs;
