
import axios from 'axios';

const fetchSearchVerticalsFromAPI = (config, userLang) => {
    return new Promise((resolve, reject) => {
        axiosAuthWrapper({
            method: 'GET',
            url: `verticals`,
            config,
            userLang
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const fetchTagsFromAPI = (config, userLang) => {
    return new Promise((resolve, reject) => {
        axiosAuthWrapper({
            method: 'GET',
            url: `tagging/search_labels`,
            config,
            userLang
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

function axiosAuthWrapper({ method, url, config, userLang, data }) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Accept': config.acceptHeader,
            'Accept-Language': userLang
        };
        if (config.bearerToken)
        {
            headers['Authorization'] = `bearer ${config.bearerToken}`;
        }
        axios({
            method,
            url: `${config.apiUrl}${url}`,
            data,
            headers: headers
        })
            .then(resolve, reject)
            .catch(error => {
                reject(error);
            });
    });
}

const headerActions = {
    changeVertical: vertical => ({
        type: 'CHANGE_VERTICAL',
        payload: {
            vertical
        }
    }),
    requestSearchVerticals: () => ({
        type: 'REQUEST_SEARCH_VERTICALS'
    }),
    receiveSearchVerticals: verticals => ({
        type: 'RECEIVE_SEARCH_VERTICALS',
        payload: {
            verticals
        }
    }),
    fetchSearchVerticals: (config, userLang) => {
        return (dispatch) => {
            dispatch(headerActions.requestSearchVerticals());
            return fetchSearchVerticalsFromAPI(config, userLang)
                .then(verticals => {
                    dispatch(headerActions.receiveSearchVerticals(verticals));
                });
        };
    },
    requestTags: () => ({
        type: 'REQUEST_TAGS'
    }),
    receiveTags: tags => ({
        type: 'RECEIVE_TAGS',
        payload: {
            tags
        }
    }),
    fetchTags: (config, userLang) => {
        return (dispatch) => {
            dispatch(headerActions.requestTags());
            return fetchTagsFromAPI(config, userLang)
                .then(tags => {
                    dispatch(headerActions.receiveTags(tags));
                });
        };
    },
    selectDate: date => ({
        type: 'SELECT_DATE',
        payload: {
            date
        }
    }),
    selectGuestOption: guests => ({
        type: 'SELECT_GUEST_OPTION',
        payload: {
            guests
        }
    }),
    selectLocation: location => ({
        type: 'SELECT_LOCATION',
        payload: {
            location
        }
    }),
    selectTag: tag => ({
        type: 'SELECT_TAG',
        payload: {
            tag
        }
    }),
    setDefaultTag: () => ({
        type: 'SET_DEFAULT_TAG'
    }),
    setTagLabel: tagLabel => ({
        type: 'SET_TAG_LABEL',
        payload: {
            tagLabel
        }
    })
};

export default headerActions;
