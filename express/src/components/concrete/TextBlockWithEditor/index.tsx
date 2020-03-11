import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Components
import StatefulComponent, { StatefulProps, StatefulState } from '@src/components/base/StatefulComponent';
import Editor from '@src/components/abstract/Editor';
import HtmlTextBlock from '@src/components/concrete/HtmlTextBlock';
import EditOverlay from '@src/components/abstract/EditOverlay';
import EditSaving from '@src/components/abstract/EditSaving';

type Props = StatefulProps & {
  html: string;
  onSave: (html: string) => void;
};
type State = StatefulState & {
  machine: Machine;
};
type Machine = {
  processing: boolean;
  error: string;
  html: string;
  editing: boolean;
  editHtml: string;
};

class TextBlockWithEditor extends StatefulComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'default',
      machine: this.generateState('default', props.html),
    };
  }

  generateState(stateName: string, stateParam: any) {
    const previousState = this.state ? { ...this.state.machine } : {
      editHtml: '',
      html: '',
    };

    switch (stateName) {
      case 'edit':
        return {
          processing: false,
          error: null,
          html: previousState.html,
          editing: true,
          editHtml: previousState.editHtml,
        };
      case 'saving':
        return {
          processing: true,
          error: null,
          html: previousState.html,
          editing: true,
          editHtml: stateParam,
        };
      case 'save_error':
        return {
          processing: false,
          error: stateParam,
          html: previousState.html,
          editing: true,
          editHtml: previousState.editHtml,
        };
      default:
        return {
          processing: false,
          error: null,
          html: stateParam || previousState.html,
          editing: false,
          editHtml: null,
        };
    }
  }

  handleEdit = (): void => {
    this.goToState('edit');
  }

  handleSave = (html: string): void => {
    this.goToState('saving', html);
    this.props.onSave(html);
    setTimeout(() => {
      // If error:
      // this.goToState('save_error', error);
      this.goToState('default', html);
    }, 2000);
  }

  render() {
    const { processing, error, html, editing } = this.state.machine;

    return (
      <div className={css(pagestyles.relativePosition)}>
        {(processing || error) &&
          <EditSaving
            errorMessage={error}
            savingMessage="Saving"
          />
        }
        {editing ? (
          <Editor
            html={html}
            onSave={this.handleSave}
          />
        ) : (
          <React.Fragment>
            <EditOverlay onClick={this.handleEdit} />
            <HtmlTextBlock html={html} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TextBlockWithEditor;
