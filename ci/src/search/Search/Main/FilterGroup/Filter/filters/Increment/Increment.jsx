
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

class Increment extends Component {
    constructor(props) {
        super(props);
        const { value } = props;
        this.state = {
            value: value || 0
        };
        this.decrement = this.decrement.bind(this);
        this.emitValueChange = this.emitValueChange.bind(this);
        this.increment = this.increment.bind(this);
    }

    componentDidMount() {
        const { emitValue, id } = this.props;
        this._element = document.getElementById(id);
        this._element.addEventListener('incrementChange', emitValue);
    }

    emitValueChange() {
        const event = new Event('incrementChange', { bubbles: true });
        this._element.dispatchEvent(event);
    }

    decrement() {
        const { emitValueChange } = this;
        this.setState(({ value }) => ({ value: Number(value) - 1 }), emitValueChange);
    }

    increment() {
        const { emitValueChange } = this;
        this.setState(({ value }) => ({ value: Number(value) + 1 }), emitValueChange);
    }

    render() {
        const { decrement, increment } = this;
        const { value } = this.state;
        const { filterIndex, id, label, legendText, maxValue, minValue } = this.props;
        return (
            <div className={css(styles.baseContainer)}>
                <fieldset className={css(styles.fieldSet)}>
                    <legend className={css(styles.visuallyHidden)}>
                        <span>{legendText}</span>
                    </legend>
                    <div className={css(styles.containerFallback)}>
                        <div className={css(styles.beforeFallback)}>
                            <div className={css(styles.table)}>
                                <div>
                                    <div className={css(styles.text)}>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={css(styles.afterFallback)}>
                            <div className={css(styles.table, styles.buttons)}>
                                <div className={css(styles.middleAlignedCell, styles.left)}>
                                    <button
                                        type="button"
                                        disabled={minValue ? value === minValue : value === 0}
                                        className={css(styles.button)}
                                        aria-controls=""
                                        onClick={decrement}
                                    >
                                        <span
                                            className={
                                                value > 0 ?
                                                    css(styles.icon) :
                                                    css(styles.icon, styles.iconDisabled)
                                            }
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                role="img"
                                                aria-label="subtract"
                                                focusable="false"
                                                style={{
                                                    display: 'block',
                                                    fill: 'currentcolor',
                                                    height: '1em',
                                                    width: '1em'
                                                }}
                                            >
                                                <rect width="12" height="2" x="6" y="11" rx="1" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div
                                    id=""
                                    role="region"
                                    aria-live="polite"
                                    aria-label="Any bedrooms"
                                    className={css(styles.middleAlignedCell, styles.center)}
                                >
                                    <div
                                        className={css(styles.text)}
                                        id={id}
                                        data-filter-index={filterIndex}
                                        data-input-type="increment"
                                        data-value={value}
                                    >{value}</div>
                                </div>
                                <div className={css(styles.middleAlignedCell, styles.right)}>
                                    <button
                                        type="button"
                                        className={css(styles.button)}
                                        disabled={maxValue ? value === maxValue : false}
                                        aria-controls=""
                                        onClick={increment}
                                    >
                                        <span className={css(styles.icon)}>
                                            <svg
                                                viewBox="0 0 24 24"
                                                role="img"
                                                aria-label="add"
                                                focusable="false"
                                                style={{
                                                    display: 'block',
                                                    fill: 'currentcolor',
                                                    height: '1em',
                                                    width: '1em'
                                                }}
                                            >
                                                <rect width="12" height="2" x="6" y="11" rx="1" />
                                                <rect width="2" height="12" x="11" y="6" rx="1" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
}

Increment.propTypes = {
    emitValue: PropTypes.func.isRequired,
    filterIndex: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    legendText: PropTypes.string,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    value: PropTypes.number.isRequired
};

export default Increment;
