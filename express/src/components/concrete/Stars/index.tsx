import * as React from 'react';
import shortid from 'shortid';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import FullStar from '@src/components/concrete/Stars/FullStar';
import EmptyStar from '@src/components/concrete/Stars/EmptyStar';
import HalfStar from '@src/components/concrete/Stars/HalfStar';

type Props = {
  rating: number;
  size?: string;
};

class Stars extends React.PureComponent<Props> {
  protected stars: JSX.Element[];

  findStarSize = () => {
    const { size } = this.props;
    switch (size) {
      case 'large': {
        return [pagestyles.icon18, margin.right_0_75];
      }
      default:
        return null;
    }
  }

  renderStars = () => {
    const { rating } = this.props;
    const stars = [];
    const numStars = ((Math.ceil(rating * 2)) / 2);
    const numFullStars = Math.floor(numStars);
    const starSize = this.findStarSize();
    for (let i = 1; i <= numFullStars; ++i) {
      stars.push(
        <FullStar
          customStyle={starSize}
          key={shortid.generate()}
        />
      );
    }
    if (numFullStars !== numStars) {
      stars.push(
        <HalfStar
          customStyle={starSize}
          key={shortid.generate()}
        />
      );
    }
    if (stars.length < 5) {
      const emptyStars = 5 - stars.length;
      for (let e = 1; e <= emptyStars; ++e) {
        stars.push(
          <EmptyStar
            customStyle={starSize}
            key={shortid.generate()}
          />
        );
      }
    }
    return stars;
  }

  render() {
    return (
      <React.Fragment>
        {this.renderStars()}
      </React.Fragment>
    );
  }
}

export default Stars;
