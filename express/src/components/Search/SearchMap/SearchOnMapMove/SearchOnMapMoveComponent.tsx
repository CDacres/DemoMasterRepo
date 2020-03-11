import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  shouldSearchOnMapMove: boolean;
  toggleSearchOnMapMove: () => void;
};

const SearchOnMapMoveComponent = ({ shouldSearchOnMapMove, toggleSearchOnMapMove }: Props) => (
  <div className={css(styles.mapRefreshControls)}>
    <div className={css(styles.mapRefreshWrapper, margin.right_1, margin.bottom_1, padding.left_1_5, padding.right_1)}>
      <label
        className={css(styles.checkboxLabel, padding.topbottom_1)}
        htmlFor="map-auto-refresh-checkbox"
      >
        <input
          checked={shouldSearchOnMapMove}
          className={css(styles.checkbox, margin.right_1_5)}
          id="map-auto-refresh-checkbox"
          onChange={toggleSearchOnMapMove}
          type="checkbox"
          value="on"
        />
        <Translatable content={{ transKey: 'search.move_map' }}>
          <span className={css(styles.refreshText, margin.all_0)} />
        </Translatable>
      </label>
    </div>
  </div>
);

export default SearchOnMapMoveComponent;
