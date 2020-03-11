import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.isChecked
        };
    }
    render() {
        return (
            <input
                type="checkbox"
                id={this.props.id}
                className={this.props.className}
                name={this.props.name}
                checked={this.this.state.isChecked}
            />
        );
    }
}

Checkbox.propTypes = {
    isChecked: React.PropTypes.bool
};

Checkbox.defaultProps = {
    isChecked: false
};

export default Checkbox;
