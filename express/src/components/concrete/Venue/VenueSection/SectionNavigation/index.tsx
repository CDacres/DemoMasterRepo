import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import NavigationItem from '@src/components/concrete/Venue/VenueSection/SectionNavigation/NavigationItem';

type Props = {
  navigation: Array<{
    link: string;
    subtitle: string;
    title: string;
  }>;
};

const SectionNavigation = ({ navigation }: Props) => (
  <div className={css(styles.wrapper, margin.left_0)}>
    <section>
      <div className={css(styles.container)}>
        {navigation.map(({ link, subtitle, title }) => (
          <NavigationItem
            link={link}
            key={shortid.generate()}
            title={title}
            subtitle={subtitle}
          />
        ))}
      </div>
    </section>
  </div>
);

export default SectionNavigation;
