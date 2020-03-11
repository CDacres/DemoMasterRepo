
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SaveButton = ({ handleSave, handleSkip, lang, step }) => {
    return (
        <div className="row space-2 space-top-2 aligner">
            <div className="col-sm-4 aligner-item">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSave}
                    disabled={
                        step[6].password === '' ||
                        step[6].password_confirmation === ''
                    }
                >
                    <span>{lang.users.users_create_account}</span>
                </button>
            </div>
            <div className="col-sm-4 aligner-item">
                <a
                    href="#"
                    className="right-m-1 light-grey-font"
                    onClick={handleSkip}
                >{lang.users.users_not_this_time}</a>
            </div>
        </div>
    );
};

SaveButton.propTypes = {
    handleSave: PropTypes.func.isRequired,
    handleSkip: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired
};

const mapStateToProps = ({ step }) => ({ step });

export default connect(mapStateToProps)(SaveButton);
