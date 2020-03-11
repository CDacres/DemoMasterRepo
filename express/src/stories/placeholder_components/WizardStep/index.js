import * as React from 'react';
import { connect } from 'react-redux';

class Step extends React.PureComponent {
  isValidated() {
    return true;
  }

  render() {
    return (
      <div>
        Step {this.props.number}
      </div>
    );
  }
}

export default connect(null, null, null, { withRef: true })(Step);
