import * as React from 'react';
import { func, string } from 'prop-types';
import { css } from 'aphrodite/no-important';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import './styles.css';

import styles from './styles';

import FroalaEditor from 'react-froala-wysiwyg';

import config from './config';

export default class Editor extends React.PureComponent {
  static propTypes = {
    html: string.isRequired,
    onSave: func.isRequired
  };

  state = {
    dataToSave: this.props.html,
    model: this.props.html
  };

  config = {
    ...config,
    events: {
      'froalaEditor.on.blur': (e, editor) => {
        if (editor.codeView.isActive() && editor.codeView.get() !== this.state.dataToSave) {
          this.setState({
            dataToSave: editor.codeView.get()
          });
        } else if (this.state.model !== this.state.dataToSave) {
          this.setState({
            dataToSave: this.state.model
          });
        }
      }
    },
    fontFamilySelection: false,
    linkStyles: {
      'button-link': 'Button'
    }
  };

  handleModelChange = model => {
    this.setState({ model });
  };

  handleSave = () => {
    this.props.onSave(this.state.dataToSave);
  };

  render() {
    return (
      <React.Fragment>
        <FroalaEditor
          config={this.config}
          model={this.state.model}
          onModelChange={this.handleModelChange}
          tag="textarea"
        />
        <button
          className={`${css(styles.saveButton)} fa fa-check`}
          onClick={this.handleSave}
        />
      </React.Fragment>
    );
  }
}
