/* tslint:disable:max-line-length */
import { Component } from 'react';

type Props = {
  children: (image: string, loading: boolean) => JSX.Element | JSX.Element[];
  onError?: (error: any) => void;
  placeholder?: string;
  src: string;
};

type State = {
  image: string;
  loading: boolean;
};

class LazyLoadImage extends Component<Props, State> {
  static defaultProps = { placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAYABgAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABgAAAAAQAAAGAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAA6gAwAEAAAAAQAAAAkAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAAkADgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/3QAEAAH/2gAMAwEAAhEDEQA/APULbVtHhiltpUs9O1C22uRJIIpQrMwVwQ2DxjPPBznFXLTxfoLWt+1xcxTXEN1FErE7vl8kFvmHB+fPv0r51+Mv/I56f/v/APsj11XwY/489e/6/ov/AEnjqYQstGVKV2rn/9k=' };

  state: State = {
    image: this.props.placeholder,
    loading: true,
  };

  protected image;

  componentDidMount() {
    this.loadImage(this.props.src);
  }

  componentWillReceiveProps({ placeholder, src }: Props) {
    if (src !== this.props.src) {
      this.setState({
        image: placeholder,
        loading: true,
      }, () => {
        this.loadImage(src);
      });
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  loadImage = src => {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = src;
  }

  onLoad = () => {
    this.setState({
      image: this.image.src,
      loading: false,
    });
  }

  onError = errorEvent => {
    if (this.props.onError) {
      this.props.onError(errorEvent);
    }
  }

  render() {
    if (!this.props.children || typeof this.props.children !== 'function') {
      throw new Error('ProgressiveImage requires a function as its only child');
    }
    return this.props.children(this.state.image, this.state.loading);
  }
}

export default LazyLoadImage;
