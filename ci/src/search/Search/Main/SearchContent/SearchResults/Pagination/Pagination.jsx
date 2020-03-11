
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: Number(props.params.page),
            totalPages: Math.ceil(props.roomCount / props.pageSize)
        };
    }

    paginateNext() {
        const { paginateNext } = this.props;
        paginateNext();
    }

    paginatePrev() {
        const { paginatePrev } = this.props;
        paginatePrev();
    }

    render() {
        const { paginateNext, paginatePrev } = this;
        const { activePage, totalPages } = this.state;
        return (
            <div style={{ margin: '20px 0 60px 0' }}>
                <div className={css(styles.center)}>
                    <div style={{ marginBottom: '40px' }}>
                        <nav role="navigation" data-id="SearchResultsPagination">
                            <div>
                                <ul
                                    data-id="SearchResultsPagination"
                                    className={css(styles.buttonList)}
                                >
                                    {
                                        activePage > 1 ?
                                            <li className={css(styles.buttonContainer)}>
                                                <a
                                                    href="/s/homes?allow_override%5B%5D=&amp;s_tag=U2wZHwMJ&amp;section_offset=1"
                                                    className="link_1ko8une"
                                                    aria-busy="false"
                                                    onClick={paginatePrev}
                                                >
                                                    <div className={css(styles.chevronButton)}>
                                                        <div className={css(styles.chevronContainer)}>
                                                            <svg
                                                                viewBox="0 0 18 18"
                                                                role="img"
                                                                aria-label="Previous"
                                                                focusable="false"
                                                                style={{
                                                                    display: 'block',
                                                                    fill: 'currentcolor',
                                                                    height: '1em',
                                                                    width: '1em'
                                                                }}
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li> : null
                                    }
                                    {
                                        activePage === 1 ?
                                            <li className={css(styles.buttonContainer, styles.noLeftMargin)}>
                                                <a
                                                    href=""
                                                    className={css(styles.link, styles.linkSelected)}
                                                    aria-label={`Page ${activePage}, current page`}
                                                >
                                                    <div
                                                        className={css(
                                                            styles.numberContainer,
                                                            styles.numberContainer_selected
                                                        )}
                                                    >{activePage}</div>
                                                </a>
                                            </li> :
                                            <li className={css(styles.buttonContainer)}>
                                                <a href="" className={css(styles.link)} aria-label="Page 2">
                                                    <div className={css(styles.numberContainer)}>{activePage}</div>
                                                </a>
                                            </li>
                                    }
                                    <li className={css(styles.buttonContainer)}>
                                        <a href="" className={css(styles.link)} aria-label="Page 2">
                                            <div className={css(styles.numberContainer)}>2</div>
                                        </a>
                                    </li>
                                    <li className={css(styles.buttonContainer)}>
                                        <a href="" className={css(styles.link)} aria-label="Page 3">
                                            <div className={css(styles.numberContainer)}>3</div>
                                        </a>
                                    </li>
                                    <li className={css(styles.buttonContainer)}>
                                        <div className={css(styles.elipsis)}>
                                            <div
                                                className={css(
                                                    styles.text,
                                                    styles.size_regular,
                                                    styles.weight_light
                                                )}
                                            >…</div>
                                        </div>
                                    </li>
                                    <li className={css(styles.buttonContainer)}>
                                        <a href="" className={css(styles.link)} aria-label="Page 17">
                                            <div className={css(styles.numberContainer)}>{totalPages}</div>
                                        </a>
                                    </li>
                                    {
                                        activePage !== totalPages ?
                                            <li
                                                className={
                                                    css(styles.buttonContainer, styles.noRightMargin)
                                                }
                                            >
                                                <a
                                                    href=""
                                                    className={css(styles.link)}
                                                    onClick={paginateNext}
                                                >
                                                    <div className={css(styles.chevronButton)}>
                                                        <div className={css(styles.chevronContainer)}>
                                                            <svg
                                                                viewBox="0 0 18 18"
                                                                role="img"
                                                                aria-label="Next"
                                                                focusable="false"
                                                                style={{
                                                                    display: 'block',
                                                                    fill: 'currentcolor',
                                                                    height: '1em',
                                                                    width: '1em'
                                                                }}
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li> : null
                                    }
                                </ul>
                            </div>
                        </nav>
                        <div style={{ marginTop: '8px' }}>
                            <span>
                                <span>1</span>
                                <span>–</span>
                                <span>18</span>
                                <span>
                                    <span>300+ spaces</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    paginateNext: PropTypes.func.isRequired,
    paginatePrev: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    roomCount: PropTypes.number.isRequired
};

export default Pagination;
