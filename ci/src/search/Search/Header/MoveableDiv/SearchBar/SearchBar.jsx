
import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import SearchBarSmall from './SearchBarSmall';
import SearchBarLarge from './SearchBarLarge';

const SearchBar = ({ lang }) => {
    return (
        <div>
            <MediaQuery query="(max-width: 444px)">
                <SearchBarSmall />
            </MediaQuery>
            <MediaQuery query="(min-width: 445px)">
                <SearchBarLarge
                    lang={lang}
                />
            </MediaQuery>
        </div>
    );
};

SearchBar.propTypes = {
    lang: PropTypes.object.isRequired
};

export default SearchBar;
