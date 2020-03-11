import * as React from 'react';

// Components
import RadioButtonComponent from '@src/components/concrete/Inputs/RadioButton/RadioButtonComponent';

// Types
import { Radio } from '@src/typings/types';

type Props = {
  defaultOption: string;
  name: string;
  options: Array<{
    extraText?: {
      subtext?: string;
      text?: string;
    };
    id: string;
    learnMoreAction?: () => void;
    subtext?: string;
    text: string;
  }>;
} & Radio;

type State = {
  selected: string;
};

class RadioButtonContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { defaultOption } = this.props;
    this.state = { selected: defaultOption };
  }

  handleClick = (e) => {
    this.setState({ selected: e.target.id });
  }

  render() {
    const { boldText, interiorPadding, isLarge, itemBorder, name, noBorder, options, radioPosition } = this.props;
    const { selected } = this.state;
    return (
      <React.Fragment>
        {options.map(item => (
          <RadioButtonComponent
            boldText={boldText}
            extraText={item.extraText}
            id={item.id}
            handleClick={this.handleClick}
            interiorPadding={interiorPadding}
            isLarge={isLarge}
            itemBorder={itemBorder}
            key={item.id}
            learnMoreAction={item.learnMoreAction}
            name={name}
            noBorder={noBorder}
            radioPosition={radioPosition}
            selected={selected}
            subtext={item.subtext}
            text={item.text}
            value={item.text}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default RadioButtonContainer;
