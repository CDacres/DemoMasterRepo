
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import store from '../store';

import Search from './Search.jsx';

const SearchProvider = ({ lang }) => {
    return (
        <Provider store={store}>
            <Search
                lang={lang}
            />
        </Provider>
    );
};

SearchProvider.propTypes = {
    lang: PropTypes.object.isRequired
};

export default SearchProvider;
