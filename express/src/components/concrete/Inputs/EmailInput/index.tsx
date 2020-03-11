import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import inputStyles from '../styles';
import { pagestyles } from '@src/styles';

// Components
import Icon from '@src/components/concrete/Inputs/Icon';
import Label from '@src/components/concrete/Inputs/Label';
import { Envelope } from '@src/components/concrete/Icons/svgs';

declare const _nb: any;

type Props = {
  hasNeverBounceValidation?: boolean;
  id: string;
  label?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommit?: VoidFunction;
  value: string;
};

class EmailInput extends React.PureComponent<Props> {
  protected emailInput;

  constructor(props: Props) {
    super(props);
    this.emailInput = React.createRef();
  }

  componentDidMount() {
    if (typeof _nb !== 'undefined') {
      _nb.fields.registerListener(this.emailInput.current, true);
    }
  }

  render() {
    const { hasNeverBounceValidation, id, label, name, onChange, onCommit, value } = this.props;
    return (
      <React.Fragment>
        {label &&
          <Label text={label} />
        }
        <Icon>
          <Envelope
            outline={true}
            stylesArray={[pagestyles.icon, pagestyles.iconGrey]}
          />
        </Icon>
        <div className={css(inputStyles.inputWrapper)}>
          <div className={css(inputStyles.inputContainer)}>
            <input
              aria-label={label}
              autoComplete="off"
              className={`${css(inputStyles.input)}${hasNeverBounceValidation ? ' email-check' : ''}`}
              id={id}
              name={name}
              onChange={onChange}
              onKeyDown={e => {
                if (e.keyCode === 13 && onCommit) {
                  onCommit();
                }
              }}
              placeholder={label}
              ref={this.emailInput}
              type="email"
              value={typeof value !== 'undefined' ? value : ''}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailInput;
