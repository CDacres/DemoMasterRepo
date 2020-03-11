import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  learnMoreLink?: string;
  needsPadding?: boolean;
  removeWeight?: boolean;
  smallerTitle?: boolean;
  subtitle?: string;
  title: string;
};

const Subtitle = ({ learnMoreLink, needsPadding, removeWeight, smallerTitle, subtitle, title }: Props) => (
  <section>
    <SubtitleItem
      needsPadding={needsPadding}
      removeWeight={removeWeight}
      smaller={smallerTitle}
      text={title}
    />
    {subtitle &&
      <div className={css(pagestyles.subtitle, margin.all_0)}>
        <Translatable content={{ transKey: subtitle }} />
        {learnMoreLink &&
          <React.Fragment>
            {' '}
            <BrowserLink
              className={css(pagestyles.link, pagestyles.linkUnderlined)}
              href={learnMoreLink}
            >
              <Translatable content={{ transKey: 'common.learn_more' }} />
            </BrowserLink>
          </React.Fragment>
        }
      </div>
    }
  </section>
);

export default Subtitle;
