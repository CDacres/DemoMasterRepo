import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';

import RadioBlockItem from './RadioBlockItem';

const RadioBlock = ({
    defaultConfiguration,
    handleChange,
    items,
    lang,
    name
}) => {
    return (
        <div>
            {items.map((item, index) => {
                let itemState = 0;
                if (index === 0) {
                    itemState = 1;
                } else if (index === items.length - 1) {
                    itemState = 2;
                }
                return (
                    <RadioBlockItem
                        key={shortId.generate()}
                        id={name}
                        name={name}
                        handleChange={handleChange}
                        itemState={itemState}
                        lang={lang}
                        value={item.config_id}
                        defaultSelect={item.config_id === defaultConfiguration.config_id}
                        {...item}
                    />
                );
            })}
        </div>
    );
};

RadioBlock.propTypes = {
    defaultConfiguration: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    lang: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};

export default RadioBlock;
