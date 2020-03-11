import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Connectors
import { useSearchMap } from '@src/store/connectors';

// Components
import ToggleSwitch from '@src/components/concrete/Inputs/ToggleSwitch';
import { RightSidebar } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Store } from '@src/typings/types';

type Props = {
  map: Store.Pages.Search.Map;
  toggleMap: () => void;
};

class MapToggle extends React.PureComponent<Props> {
  handleToggle = () => {
    const { toggleMap } = this.props;
    toggleMap();
  }

  render() {
    const { map: { isVisible } } = this.props;
    return (
      <div
        aria-hidden="false"
        className={css(styles.mapToggleWrapper, isVisible ? margin.right_3_large : margin.right_10_large)}
      >
        <RightSidebar>
          {matches => {
            if (matches) {
              return (
                <div>
                  <div className={css(pagestyles.table)}>
                    <Translatable content={{ transKey: 'search.show_map' }}>
                      <div className={css(styles.mapToggleTableCell, pagestyles.tableCellMiddle, padding.right_1)} />
                    </Translatable>
                    <ToggleSwitch
                      label="toggle_map"
                      name="toggle_map"
                      onChange={this.handleToggle}
                      value={isVisible}
                    />
                  </div>
                </div>
              );
            }
            return null;
          }}
        </RightSidebar>
      </div>
    );
  }
}

export default useSearchMap(MapToggle);
