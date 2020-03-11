import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RadioBlock from './RadioBlock';
import AddComments from './AddComments';

class AboutEvent extends Component {
    componentDidMount() {
        const { handleVisited } = this.props;
        handleVisited(2);
    }

    render() {
        const {
            configurations,
            defaultConfiguration,
            handleChange,
            lang
        } = this.props;
        return (
            <div>
                <div className="space-4">
                    <RadioBlock
                        defaultConfiguration={defaultConfiguration}
                        name="configuration"
                        items={configurations}
                        lang={lang}
                        handleChange={handleChange}
                    />
                </div>
                <AddComments
                    handleChange={handleChange}
                    lang={lang}
                />
            </div>
        );
    }
};

AboutEvent.propTypes = {
    configurations: PropTypes.array.isRequired,
    defaultConfiguration: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

export default AboutEvent;
