import React from 'react';
import { render } from 'react-dom';

import SearchProvider from './Search/SearchProvider.jsx';

$(document).ready(() => {
    render(
        <SearchProvider
            lang={window.__props__.lang}
        />, document.querySelector('#root')
    );
});
