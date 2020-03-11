
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import AddOn from './AddOn';

class AddOns extends Component {
    componentDidMount() {
        const { handleVisited } = this.props;
        handleVisited(3);
    }

    render() {
        const { amenities, handleAddOn, lang } = this.props;
        const elements = amenities.map(
            (amenity) =>
                <AddOn
                    key={shortid.generate()}
                    amenity={amenity}
                    handleAddOn={handleAddOn}
                    lang={lang}
                />
        );
        return (
            <div>{elements}</div>
        );
    }
}


AddOns.propTypes = {
    amenities: PropTypes.array.isRequired,
    handleAddOn: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

export default AddOns;
