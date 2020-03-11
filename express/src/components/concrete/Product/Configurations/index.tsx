/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericCard from '@src/components/concrete/GenericCard';

// Types
import { Store } from '@src/typings/types';

type Props = {
  configurations: Store.RoomConfig;
  stylesArray?: object[];
};

const Configurations = ({ configurations, stylesArray }: Props) => (
  <div className={css(styles.configContainer, stylesArray ? stylesArray : null)}>
    {configurations.map(config => (
      <GenericCard
        boxShadow="none"
        customStyle={styles.configWrapper}
        key={config.config_id}
        padding="6px"
      >
        <span className={css(styles.configIcon, styles[config.name.toLowerCase()], margin.right_0_5)} />
        <Translatable content={{ transKey: `room.${config.name.toLowerCase()}`, count: 1, replacements: { number: config.max_capacity } }}>
          <span className={css(styles.configText)} />
        </Translatable>
      </GenericCard>
    ))}
  </div>
);

export default Configurations;
