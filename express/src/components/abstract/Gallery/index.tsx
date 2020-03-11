import * as React from 'react';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';

type Props = {
  photos?: any[];
  first?: boolean;
};

type State = {
  width: number;
};

class GalleryContainer extends React.PureComponent<Props, State> {
  state: State = { width: -1 };

  render() {
    const { width } = this.state;
    const { first, photos } = this.props;
    return (
      <Measure
        bounds={true}
        onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}
      >
        {({ measureRef }) => {
          if (width < 1) {
            return <div ref={measureRef} />;
          }
          return (
            <div>
              <div>
                {first &&
                  <Gallery
                    columns={1}
                    direction="column"
                    margin={5}
                    photos={[photos[0]]}
                  />
                }
              </div>
              <div ref={measureRef}>
                <Gallery
                  columns={(width >= 744) ? 2 : 1}
                  direction="column"
                  margin={5}
                  photos={first ? photos.filter(({}, i) => i > 0) : photos}
                />
              </div>
            </div>
          );
        }}
      </Measure>
    );
  }
}

export default GalleryContainer;
