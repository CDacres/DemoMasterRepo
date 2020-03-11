/* global _ */

import html from './SidebarAlert.html';
import './SidebarAlert.css';

const template = _.template(html);

function SidebarAlert(content) {
    return template(content);
}

export default SidebarAlert;
