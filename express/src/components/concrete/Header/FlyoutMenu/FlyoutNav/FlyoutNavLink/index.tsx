/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import flyoutNavStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import LinkWrapper from '@src/components/concrete/LinkWrapper';

// Types
import { ActionLink, MailLink, TelLink } from '@src/typings/types';

type Props = {
  color?: string;
  icon?: object;
  subtitle?: object;
  title: object;
  url?: string;
} & ActionLink & MailLink & TelLink;

const FlyoutNavLink = ({ action, color, icon, subtitle, tel, title, url }: Props) => (
  <li aria-hidden="false">
    <LinkWrapper
      action={action}
      attributes={{ title }}
      className={css(flyoutNavStyles.link, padding.topbottom_1_5)}
      href={url}
      role="menuitem"
      tel={tel}
    >
      <div className={css(flyoutNavStyles.linkContainer)}>
        <div
          className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}
          style={{ color: color }}
        >
          <div>
            <Translatable content={title} />
            {subtitle &&
              <div className={css(padding.top_0_25)}>
                <div className={css(pagestyles.smallText, margin.all_0)}>
                  <Translatable content={subtitle} />
                </div>
              </div>
            }
          </div>
        </div>
        {icon ? (
          <div className={css(pagestyles.tableCellMiddle)}>
            {icon}
          </div>
        ) : (
          null
        )}
      </div>
    </LinkWrapper>
  </li>
);

export default FlyoutNavLink;
