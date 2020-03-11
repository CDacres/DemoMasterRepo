
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderText from './HeaderText';
import HeaderSearchBar from './HeaderSearchBar';

import actions from '../actions';

import { onSubmitSearch } from './methods';

const mapStateToProps = state => ({
    date: state.date,
    guests: state.guests,
    locationSelected: state.locationSelected,
    location_desc: state.location_desc,
    tag: state.tag,
    tagLabel: state.tagLabel,
    tags: state.tags,
    verticals: state.verticals
});

const mapDispatchToProps = dispatch => {
    return {
        changeVertical: vertical => dispatch(actions.changeVertical(vertical)),
        selectDate: date => dispatch(actions.selectDate(date)),
        selectGuestOption: guests => dispatch(actions.selectGuestOption(guests)),
        selectLocation: location => dispatch(actions.selectLocation(location)),
        selectTag: (tag, tags) => dispatch(actions.selectTag(tag, tags)),
        setTagLabel: tagLabel => dispatch(actions.setTagLabel(tagLabel))
    };
};

const HeaderElement = ({
    api_url,
    attribute,
    country_lang_url,
    date,
    editTitles,
    guests,
    h1,
    h2,
    homePage,
    isBrowsePage,
    landing_page_id,
    lang,
    language_code,
    lat,
    locationSelected,
    location,
    location_desc,
    lon,
    search_url,
    selectDate,
    selectTag,
    selectGuestOption,
    selectLocation,
    setTagLabel,
    tag,
    tagLabel,
    tags
}) => {
    return (
        <div className="landing-header">
            <HeaderText
                api_url={api_url}
                editTitles={editTitles}
                h1={h1}
                h2={h2}
                homePage={homePage}
                landing_page_id={landing_page_id}
            />
            <HeaderSearchBar
                attribute={attribute}
                country_lang_url={country_lang_url}
                date={date}
                defaultTags={tags.defaultTags}
                guests={guests}
                homePage={homePage}
                isBrowsePage={isBrowsePage}
                lang={lang}
                language_code={language_code}
                lat={lat}
                locationSelected={locationSelected}
                location={location}
                location_desc={location_desc}
                lon={lon}
                onSubmitSearch={onSubmitSearch}
                search_url={search_url}
                selectDate={selectDate}
                selectGuestOption={selectGuestOption}
                selectLocation={selectLocation}
                selectTag={selectTag}
                setTagLabel={setTagLabel}
                tag={tag}
                tagLabel={tagLabel}
                tags={tags.tags}
            />
        </div>
    );
};

HeaderElement.propTypes = {
    api_url: PropTypes.string.isRequired,
    attribute: PropTypes.string,
    changeVertical: PropTypes.func.isRequired,
    country_lang_url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    editTitles: PropTypes.bool.isRequired,
    guests: PropTypes.string.isRequired,
    h1: PropTypes.string,
    h2: PropTypes.string,
    homePage: PropTypes.bool.isRequired,
    landing_page_id: PropTypes.string,
    lang: PropTypes.object.isRequired,
    language_code: PropTypes.string.isRequired,
    lat: PropTypes.string.isRequired,
    location: PropTypes.string,
    locationSelected: PropTypes.bool.isRequired,
    location_desc: PropTypes.string,
    lon: PropTypes.string.isRequired,
    search_url: PropTypes.string,
    selectDate: PropTypes.func.isRequired,
    selectGuestOption: PropTypes.func.isRequired,
    selectLocation: PropTypes.func.isRequired,
    selectTag: PropTypes.func.isRequired,
    setTagLabel: PropTypes.func.isRequired,
    tag: PropTypes.object,
    tagLabel: PropTypes.string,
    tags: PropTypes.object.isRequired,
    verticals: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderElement);
