import React from 'react';
import PropTypes from 'prop-types';

const AddComments = ({ handleChange, lang }) => {
    return (
        <div className="reactAddComments">
            <label htmlFor="comments">
                <span>{lang.payments.payments_index_form_event_add_comments}</span>
            </label>
            <textarea
                id="comments"
                name="comments"
                className="commentsTextarea"
                onChange={handleChange}
            />
        </div>
    );
};

AddComments.propTypes = {
    handleChange: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

export default AddComments;
