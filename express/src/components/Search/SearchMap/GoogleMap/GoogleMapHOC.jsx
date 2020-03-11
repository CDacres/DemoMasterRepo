import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import GoogleMap from '@src/components/Search/SearchMap/GoogleMap/GoogleMap';

class GoogleMapHOC extends React.Component {
  // state = { shouldRender: false }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ shouldRender: true });
  //   }, 0);
  // }

  render() {
    // if (this.state.shouldRender) {
    return (
      <GoogleMap
        containerElement={
          <div
            aria-hidden="true"
            className={css(styles.mapCanvas)}
            role="presentation"
          />
        }
        mapElement={<div className={css(styles.mapFull)} />}
      />
    );
    // }
    // return null;
  }
}

export default GoogleMapHOC;
