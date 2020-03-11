
import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Main from './Main';

const IS_BROWSER = typeof window === 'object';

const Search = ({ lang }) => {
    return (
        <div>
            <Header
                IS_BROWSER={IS_BROWSER}
                lang={lang}
            />
            {
                IS_BROWSER ?
                <Main
                    lang={lang}
                /> : null
            }
        </div>
    );
};

Search.propTypes = {
    lang: PropTypes.object.isRequired
};

export default Search;
