/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import OptionImageWithTextComponent from '@src/components/concrete/Carousel/LargeCarousel/LargeOption/LargeOptionItem/OptionImageWithText/OptionImageWithTextComponent';

type Props = {
  image?: string;
  imageAdjustments?: object;
  imageText?: string;
  imageTextColor: string;
  lazyLoadImages: boolean;
  verticalId: number;
};

class OptionImageWithTextContainer extends React.Component<Props> {
  static defaultProps = {
    image: '',
    imageAdjustments: {},
    imageTextColor: '#484848',
    lazyLoadImages: false,
    verticalId: 1,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <OptionImageWithTextComponent {...this.props} />;
  }
}

export default OptionImageWithTextContainer;
