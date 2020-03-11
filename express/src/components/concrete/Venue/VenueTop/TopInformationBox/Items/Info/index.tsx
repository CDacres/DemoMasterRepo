import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';

// Components
import InfoBox from '@src/components/concrete/Venue/VenueTop/TopInformationBox/Items/Info/InfoBox';

type Props = {
  info: Array<{
    icon: string;
    text: string;
    title: string;
  }>;
};

const Info = ({ info }: Props) => (
  <div className={css(styles.infoWrapper)}>
    {info.map(item => (
      <InfoBox
        description={item.text}
        icon="Icon"
        key={shortid.generate()}
        title={item.title}
      />
    ))}
  </div>
);

export default Info;
