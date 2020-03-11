/* global _ */

import html from './StripeBanner.html';
import './StripeBanner.css';

const template = _.template(html);

function StripeBanner(content) {
    return template(content);
}

export default StripeBanner;
