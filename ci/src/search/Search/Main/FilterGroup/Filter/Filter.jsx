
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import Slider from './filters/Slider';
import Checkbox from './filters/Checkbox';
import Radio from './filters/Radio';
import { ToggleSwitchWithLabel } from './filters/ToggleSwitch';
import Increment from './filters/Increment';

import styles from './styles.js';

const Filter = ({ filter, filterIndex, filterGroupIndex, handleFilterChange }) => {
    let element;
    switch (filter.inputType) {
    case 'slider': {
        element = (
            <Slider
                filter={filter}
            />
        );
        break;
    }
    case 'radio': {
        element = (
            <Radio
                checked={filter.data.value}
                filterIndex={filterIndex}
                handleRadioChange={handleFilterChange}
                id={`radio-filter_${filterIndex}`}
                label={filter.title}
                name={filter.title}
                value={filter.value}
            />
        );
        break;
    }
    case 'toggle-switch': {
        element = (
            <ToggleSwitchWithLabel
                handleFilterChange={handleFilterChange}
                filterIndex={filterIndex}
                id={`toggle-filter_${filterIndex}`}
                label={filter.title}
                name={filter.title}
                subtitle={filter.subtitle}
                value={filter.data.value}
            />
        );
        break;
    }
    case 'increment': {
        element = (
            <Increment
                emitValue={handleFilterChange}
                filterIndex={filterIndex}
                id={`increment-filter_${filterIndex}`}
                label={filter.title}
                legendText={filter.subtitle}
                value={filter.data.value}
            />
        );
        break;
    }
    default:
        element = (
            <Checkbox
                filter={filter}
                filterIndex={filterIndex}
                filterGroupIndex={filterGroupIndex}
                handleCheckboxChange={handleFilterChange}
            />
        );
        break;
    }
    return (
        <div className={css(styles.filterContainer)}>{element}</div>
    );
};

Filter.propTypes = {
    filter: PropTypes.object.isRequired,
    filterGroupIndex: PropTypes.number.isRequired,
    filterIndex: PropTypes.number.isRequired,
    handleFilterChange: PropTypes.func.isRequired
};

export default Filter;
