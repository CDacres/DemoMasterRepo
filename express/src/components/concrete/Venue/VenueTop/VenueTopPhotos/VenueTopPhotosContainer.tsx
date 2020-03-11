import * as React from 'react';

// Components
import VenueTopPhotosComponent from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos/VenueTopPhotosComponent';

type Props = {
  images: Array<{
    isSmallImage: boolean;
    src: string;
  }>;
  openSharing?: (e?: any) => void;
};

type State = {
  like: boolean;
};

class VenueTopPhotosContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { like: false };
  }

  shareButton = () => {
    this.props.openSharing();
  }

  likeButton = () => this.setState({
    ...this.state,
    like: !this.state.like,
    // TODO: add favourite to db
  })

  render() {
    const { images } = this.props;
    const { like } = this.state;
    return (
      <VenueTopPhotosComponent
        images={images}
        like={like}
        likeAction={this.likeButton}
        shareAction={this.shareButton}
      />
    );
  }
}

export default VenueTopPhotosContainer;
