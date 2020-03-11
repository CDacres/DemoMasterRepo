
import React from 'react';
import Tooltip from 'rc-tooltip';
import RCSlider from 'rc-slider';

const Handle = RCSlider.Handle;

const SliderHandle = ({ value, dragging, index, ...restProps }) => {
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

export default SliderHandle;
