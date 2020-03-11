import * as React from 'react';

// Components
import DomainItemComponent from '@src/components/concrete/Business/BusinessWrapper/DomainItem/DomainItemComponent';

type Props = {
  peopleCount: number;
  text: string;
};

class DomainItemContainer extends React.Component<Props> {

  removeDomain = () => {
    // console.log("remove domain"); // TODO: make this a proper action
  }

  render() {
    const { peopleCount, text } = this.props;
    return (
      <DomainItemComponent
        handleRemove={this.removeDomain}
        peopleCount={peopleCount}
        text={text}
      />
    );
  }
}

export default DomainItemContainer;
