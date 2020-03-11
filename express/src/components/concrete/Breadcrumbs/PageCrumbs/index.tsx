import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { BreadcrumbType } from '@src/typings/types';

type Props = {
  items: BreadcrumbType;
};

const PageCrumbs = ({ items }: Props) => (
  <nav>
    <ol className={css(margin.all_0, padding.all_0)}>
      {items.map(({ href, text, title }, index) => {
        return (
          <li
            className={css(pagestyles.inlineBlock)}
            key={index}
          >
            {index === 0 ? (
              <span className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
                <BrowserLink
                  attributes={{ title: { transKey: title } }}
                  className={css(styles.crumbLink)}
                  href={href}
                >
                  <Translatable content={{ transKey: text }} />
                </BrowserLink>
              </span>
            ) : (index === items.length - 1) ? (
              <React.Fragment>
                <div className={css(pagestyles.inlineBlock, margin.leftright_2)}>
                  <Chevron
                    direction="right"
                    stylesArray={[pagestyles.icon, pagestyles.icon10, pagestyles.iconGrey]}
                  />
                </div>
                <Translatable content={{ transKey: text }}>
                  <span className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)} />
                </Translatable>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className={css(pagestyles.inlineBlock, margin.leftright_2)}>
                  <Chevron
                    direction="right"
                    stylesArray={[pagestyles.icon, pagestyles.icon10, pagestyles.iconGrey]}
                  />
                </div>
                <span className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
                  <BrowserLink
                    attributes={{ title: { transKey: title } }}
                    className={css(styles.crumbLink)}
                    href={href}
                  >
                    <Translatable content={{ transKey: text }} />
                  </BrowserLink>
                </span>
              </React.Fragment>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default PageCrumbs;
