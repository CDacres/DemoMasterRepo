import React from 'react';

function CustomTooltipTitle({ title, body }) {
    return (
        <div>
            <span class="tooltip-title">{ title }</span>
            <br />
            { body }
        </div>
    );
}

CustomTooltipTitle.propTypes = {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
};

export default CustomTooltipTitle;
