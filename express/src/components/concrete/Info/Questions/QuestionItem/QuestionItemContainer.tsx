import * as React from 'react';

// Components
import QuestionItemComponent from '@src/components/concrete/Info/Questions/QuestionItem/QuestionItemComponent';

// Types
import { Question } from '@src/typings/types';

type Props = {
  onClick: (question: Question) => void;
  question: Question;
};

class QuestionItemContainer extends React.Component<Props> {

  handleClick = (question: Question) => () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(question);
    }
  }

  render() {
    const { question } = this.props;
    return (
      <QuestionItemComponent
        onClick={this.handleClick(question)}
        question={question}
      />
    );
  }
}

export default QuestionItemContainer;
