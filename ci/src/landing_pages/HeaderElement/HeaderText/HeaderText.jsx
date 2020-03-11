import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';

class HeaderText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_url: props.api_url,
            h1: props.h1,
            h1_edit_visible: true,
            h1_input_visible: false,
            h1_new: props.h1,
            h1_save_visible: false,
            h2: props.h2,
            h2_edit_visible: true,
            h2_input_visible: false,
            h2_new: props.h2,
            h2_save_visible: false,
            id: props.landing_page_id
        };
        this.toggleh1 = this.toggleh1.bind(this);
        this.changeh1 = this.changeh1.bind(this);
        this.saveh1 = this.saveh1.bind(this);
        this.toggleh2 = this.toggleh2.bind(this);
        this.changeh2 = this.changeh2.bind(this);
        this.saveh2 = this.saveh2.bind(this);
    }

    toggleh1() {
        this.setState(prevState => ({
            h1_edit_visible: !prevState.h1_edit_visible,
            h1_input_visible: !prevState.h1_input_visible,
            h1_save_visible: !prevState.h1_save_visible
        }));
    }

    changeh1(e) {
        this.setState({ h1_new: e.target.value });
    }

    saveh1() {
        if (this.state.h1_new != this.state.h1)
        {
            axios({
                method: 'put',
                url: this.state.api_url,
                data: qs.stringify({
                    id: this.state.id,
                    h1: this.state.h1_new
                }),
                validateStatus: (status) => {
                    return status;
                }
            })
            .then((response) => {
                if (response.status === 405)
                {
                    bootstrapError(response.data);
                }
                else
                {
                    if (typeof response.data != 'undefined' && response.data.length)
                    {
                        const loc_usage = JSON.parse(response.data).data;
                        this.setState({ h1: loc_usage.h1 });
                    }
                    this.setState(prevState => ({
                        h1_edit_visible: !prevState.h1_edit_visible,
                        h1_input_visible: !prevState.h1_input_visible,
                        h1_save_visible: !prevState.h1_save_visible
                    }));
                }
            })
            .catch(error => new Error(error));
        }
        else
        {
            this.setState(prevState => ({
                h1_edit_visible: !prevState.h1_edit_visible,
                h1_input_visible: !prevState.h1_input_visible,
                h1_save_visible: !prevState.h1_save_visible
            }));
        }
    }

    toggleh2() {
        this.setState(prevState => ({
            h2_edit_visible: !prevState.h2_edit_visible,
            h2_input_visible: !prevState.h2_input_visible,
            h2_save_visible: !prevState.h2_save_visible
        }));
    }

    changeh2(e) {
        this.setState({ h2_new: e.target.value });
    }

    saveh2() {
        if (this.state.h2_new != this.state.h2)
        {
            axios({
                method: 'put',
                url: this.state.api_url,
                data: qs.stringify({
                    id: this.state.id,
                    h2: this.state.h2_new
                }),
                validateStatus: (status) => {
                    return status;
                }
            })
            .then((response) => {
                if (response.status === 405)
                {
                    bootstrapError(response.data);
                }
                else
                {
                    if (typeof response.data != 'undefined' && response.data.length)
                    {
                        const loc_usage = JSON.parse(response.data).data;
                        this.setState({ h2: loc_usage.h2 });
                    }
                    this.setState(prevState => ({
                        h2_edit_visible: !prevState.h2_edit_visible,
                        h2_input_visible: !prevState.h2_input_visible,
                        h2_save_visible: !prevState.h2_save_visible
                    }));
                }
            })
            .catch(error => new Error(error));
        }
        else
        {
            this.setState(prevState => ({
                h2_edit_visible: !prevState.h2_edit_visible,
                h2_input_visible: !prevState.h2_input_visible,
                h2_save_visible: !prevState.h2_save_visible
            }));
        }
    }

    render() {
        const { editTitles, homePage, landing_page_id } = this.props;
        const { h1, h1_edit_visible, h1_input_visible, h1_save_visible, h2, h2_edit_visible, h2_input_visible, h2_save_visible } = this.state;
        return (
            <div className="landing-header__h1-wrapper">
                <div className="landing-header__h1-container">
                    <h1 className="landing-header__h1">
                        {
                            homePage &&
                            <span className="landing-header__h1-span">Zipcube </span>
                        }
                        <div dangerouslySetInnerHTML={{ __html: h1 }} />
                    </h1>
                    {editTitles &&
                        <div>
                            { h1_edit_visible ? <a id="h1_edit" className="pointer" onClick={this.toggleh1}>Edit Title</a> : null }
                            { h1_input_visible ? <input id="h1_input" maxLength="255" type="text" className="form-control" defaultValue={h1} onChange={this.changeh1} /> : null }
                            { h1_save_visible ? <span id="h1_save" className="input-group-addon save_button fa fa-check" onClick={this.saveh1}></span> : null }
                        </div>
                    }
                    <h2 className="landing-header__h2" dangerouslySetInnerHTML={{ __html: h2 }} />
                    {editTitles &&
                        <div>
                            { h2_edit_visible ? <a id="h2_edit" className="pointer" onClick={this.toggleh2}>Edit Title</a> : null }
                            { h2_input_visible ? <input id="h2_input" maxLength="255" type="text" className="form-control" defaultValue={h2} onChange={this.changeh2} /> : null }
                            { h2_save_visible ? <span id="h2_save" className="input-group-addon save_button fa fa-check" onClick={this.saveh2}></span> : null }
                        </div>
                    }
                </div>
            </div>
        );
    }
};

HeaderText.propTypes = {
    api_url: PropTypes.string,
    editTitles: PropTypes.bool,
    h1: PropTypes.string,
    h2: PropTypes.string,
    homePage: PropTypes.bool,
    landing_page_id: PropTypes.string
};

export default HeaderText;
