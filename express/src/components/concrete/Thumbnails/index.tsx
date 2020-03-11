import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import InteractionLink from '@src/components/concrete/InteractionLink';
import Button from '@src/components/concrete/Button';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  hasExplore?: boolean;
  images: string[];
} & ActionLink;

const Thumbnails: React.FunctionComponent<Props> = ({ action, hasExplore, images }) => (
  <React.Fragment>
    <div className={css(styles.pictureContainer)}>
      {images.map(picture => (
        <Button
          action={action}
          key={shortid.generate()}
          stylesArray={[styles.pictureButton]}
        >
          <div className={css(styles.pictureButtonInner)}>
            <div className={css(styles.pictureInner)}>
              <div
                className={css(styles.picture)}
                style={{
                  backgroundImage: `url('${picture}')`,
                }}
              />
            </div>
          </div>
        </Button>
      ))}
    </div>
    {hasExplore &&
      <div className={css(margin.top_1)}>
        <InteractionLink
          action={action}
          className={css(pagestyles.text, pagestyles.fontMedium, pagestyles.link)}
        >
          <Translatable content={{ transKey: 'room.explore_more_pictures' }} />
        </InteractionLink>
      </div>
    }
  </React.Fragment>
);

Thumbnails.defaultProps = { hasExplore: true };

export default Thumbnails;
