/* tslint:disable:max-line-length */
import * as React from 'react';

// Connectors
import { useSearchMap } from '@src/store/connectors';

// Components
import FilterMapToggleButtonComponent from '@src/components/Search/SearchContent/FilterMapToggleButton/FilterMapToggleButtonComponent';

type Props = {
  mapIsVisible: boolean;
  toggleMap: () => void;
};

class FilterMapToggleButtonContainer extends React.PureComponent<Props> {
  handleToggleMapClick = () => {
    this.props.toggleMap();
  }

  render() {
    const { mapIsVisible } = this.props;
    return (
      <FilterMapToggleButtonComponent
        mapIsVisible={mapIsVisible}
        onClick={this.handleToggleMapClick}
      />
    );
  }
}

export default useSearchMap(FilterMapToggleButtonContainer);
