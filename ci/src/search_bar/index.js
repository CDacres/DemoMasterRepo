
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import HeaderElement from '../landing_pages/HeaderElement';

import store from '../landing_pages/store';

render(
    <Provider store={store}>
        <HeaderElement
            api_url={window.__props__.api_url}
            attribute={window.__props__.attribute}
            isBrowsePage={window.__props__.browsePage}
            country_lang_url={window.__props__.country_lang_url}
            default_location={window.__props__.default_location}
            editTitles={window.__props__.editTitles}
            h1={window.__props__.h1}
            h2={window.__props__.h2}
            homePage={window.__props__.homePage}
            landing_page_id={window.__props__.landing_page_id}
            lang={window.__props__.lang}
            language_code={window.__props__.language_code}
            lat={window.__props__.lat}
            location={window.__props__.location}
            location_desc={
                window.__props__.location_desc ?
                window.__props__.location_desc : ''
            }
            lon={window.__props__.lon}
            search_url={window.__props__.search_url}
        />
    </Provider>, document.getElementById('header-root')
);

$('#search_form').submit(e => {
    e.preventDefault();
});
