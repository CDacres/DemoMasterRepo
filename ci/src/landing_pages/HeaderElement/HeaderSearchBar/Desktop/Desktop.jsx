

const Mobile = ({  }) => {
    return (
        <div className="landing-header__search-container">
            <div className="landing-header__mobile-search-bar-container">
                <div className="landing-header__search-bar-input-container">
                    <button type="button" className="landing-header__dropdown-button">
                        <span className="landing-header__dropdown-icon">
                            <svg
                                viewBox="0 0 24 24"
                                role="presentation"
                                aria-hidden="true"
                                focusable="false"
                                style={{
                                    display: 'block',
                                    fill: 'currentcolor',
                                    height: '18px',
                                    width: '18px'
                                }}
                            >
                                <path fillRule="nonzero" d="M3.83 9.4a7.75 7.75 0 1 0 15.342 2.198A7.75 7.75 0 0 0 3.83 9.401zm16.825 2.412A9.25 9.25 0 1 1 2.343 9.186a9.25 9.25 0 0 1 18.312 2.626zM16.97 18.03a.75.75 0 0 1 1.06-1.06l5 5a.75.75 0 0 1-1.06 1.06" />
                            </svg>
                        </span>
                        <span className="landing-header__dropdown-placeholder">{
                            location_string === '' ?
                                'Anytime' : location_string
                            } · {date === '' ? 'Anytime' : date} · {
                            guests === 1 ?
                                `${guests} ${lang.common.common_person_lower}` :
                                `${guests} ${lang.common.common_people_lower}`
                        }</span>
                    </button>
                    <div
                        className="landing-header__focus-underline"
                        style={locationInputFocus ? { opacity: 1 } : null}
                    />
                </div>
            </div>
            <div className="">
                <form
                    id="search_form"
                    action={
                        `/${
                            country_lang_url
                        }/s/${
                            usageSuperset.alias !== '' ?
                                `${usageSuperset.alias}/` : ''
                        }${
                            typeof search_url !== 'undefined' ? search_url : ''
                        }`
                    }
                    method="get"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="lat" value={lat} />
                    <input type="hidden" name="lon" value={lon} />
                    <input type="hidden" name="ne_lon" />
                    <input type="hidden" name="ne_lat" />
                    <input type="hidden" name="sw_lon" />
                    <input type="hidden" name="sw_lat" />
                    <input type="hidden" name="action" value={`/${country_lang_url}/s/${usageSuperset.alias}/`} />
                    <input type="hidden" name="usages" value={`${usageSuperset.associated_usages}`} />
                    <input type="hidden" name="guests" value={guests} />
                    <div className="landing-header__search-bar-container">
                        <div className="landing-header__search-bar-input-container">
                            <div className="landing-header__search-bar-input-label">Where</div>
                            <div className="landing-header__search-bar-geo-input-container">
                                <div className="landing-header__search-bar-relative-container">
                                    <div className="landing-header__search-bar-block-fullwidth">
                                        <label
                                            className="landing-header__visually-hidden"
                                            htmlFor="location_search"
                                        >Where</label>
                                        <div className="landing-header__search-bar-input-container--borderless">
                                            <input
                                                id="location_search"
                                                type="text"
                                                autoComplete="off"
                                                className="landing-header__search-bar-input"
                                                name="location_string"
                                                placeholder="Anywhere"
                                                value={location_string}
                                                onFocus={toggleFocus}
                                                onBlur={toggleBlur}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {locationInputFocus &&
                                        <ul
                                            id="geo-results"
                                            className="landing-header__geolocation-results"
                                        >
                                            {geoResults}
                                        </ul>
                                    }
                                </div>
                            </div>
                            <div
                                className="landing-header__focus-underline"
                                style={locationInputFocus ? { opacity: 1 } : null}
                            />
                        </div>
                        <div className="landing-header__search-bar-input-container--border-left-right">
                            <div className="landing-header__search-bar-input-label">When</div>
                            <div className="landing-header__search-bar-geo-input-container">
                                <div className="landing-header__search-bar-relative-container">
                                    <div className="landing-header__search-bar-block-fullwidth">
                                        <label
                                            className="landing-header__visually-hidden"
                                            htmlFor="GeocompleteController-via-SearchBarLarge"
                                        >When</label>
                                        <div className="landing-header__search-bar-input-container--borderless">
                                            <input
                                                id="date_search"
                                                type="text"
                                                autoComplete="off"
                                                className="landing-header__search-bar-input"
                                                name="date"
                                                placeholder="Anytime"
                                                value={date}
                                                onFocus={toggleFocus}
                                                onBlur={toggleBlur}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="landing-header__focus-underline"
                                style={dateInputFocus ? { opacity: 1 } : null}
                            />
                        </div>
                        <div className="landing-header__search-bar-input-container">
                            <div className="landing-header__search-bar-input-label">Guests</div>
                            <div>
                                <button
                                    id="show_guest_panel"
                                    type="button"
                                    className="landing-header__dropdown-button"
                                    onClick={toggleGuestPanel}
                                >
                                    <span className="landing-header__dropdown-icon"></span>
                                    <span className="landing-header__dropdown-placeholder">
                                        <span>
                                            <span>{
                                                guests === 1 ?
                                                    `${guests} ${lang.common.common_person_lower}` :
                                                    `${guests} ${lang.common.common_people_lower}`
                                            }</span>
                                        </span>
                                    </span>
                                    <span className="landing-header__dropdown-chevron">
                                        <div
                                            className="landing-header__dropdown-chevron-wrapper"
                                            style={
                                                showGuestPanel ?
                                                    { transform: 'rotate(180deg)' } :
                                                    null}
                                        >
                                            <svg
                                                viewBox="0 0 18 18"
                                                role="presentation"
                                                aria-hidden="true"
                                                focusable="false"
                                                style={{
                                                    display: 'block',
                                                    fill: 'currentcolor',
                                                    height: '12px',
                                                    width: '12px'
                                                }}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
                                                />
                                            </svg>
                                        </div>
                                    </span>
                                </button>
                                {showGuestPanel &&
                                    <GuestPanel
                                        lang={lang}
                                        handleClick={handleGuestOptionClick}
                                    />
                                }
                            </div>
                            <div
                                className="landing-header__focus-underline"
                                style={showGuestPanel ? { opacity: 1 } : null}
                            />
                        </div>
                        <div
                            className="landing-header__search-bar-input-container"
                            style={{ width: '0%' }}
                        >
                            <button type="submit" className="landing-header__search-button">
                                <span>Search</span>
                            </button>
                            <div
                                className="landing-header__focus-underline"
                                style={showGuestPanel ? { opacity: 1 } : null}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
