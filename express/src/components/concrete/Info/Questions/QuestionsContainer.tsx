/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import Modal from '@src/components/concrete/Modal';
import QuestionAnswers from '@src/components/concrete/Info/Modals/QuestionAnswers';
import QuestionsComponent from '@src/components/concrete/Info/Questions/QuestionsComponent';

// Types
import { Question } from '@src/typings/types';

type Props = {
  questions: {
    left: Question[];
    right: Question[];
  };
};

type State = {
  chosenQuestion?: Question;
  questionOpened: boolean;
};

class QuestionsContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      chosenQuestion: null,
      questionOpened: false,
    };
  }

  chooseQuestion = (question: Question) => {
    this.setState({ chosenQuestion: question });
    this.toggleQuestionModal();
  }

  toggleQuestionModal = () => {
    this.setState({ questionOpened: !this.state.questionOpened });
  }

  render() {
    const { questions } = this.props;
    const { chosenQuestion, questionOpened } = this.state;
    return (
      <React.Fragment>
        <QuestionsComponent
          onClick={this.chooseQuestion}
          questions={questions}
        />
        {(chosenQuestion && questionOpened) &&
          <Modal
            action={this.toggleQuestionModal}
            large={true}
          >
            <QuestionAnswers question={chosenQuestion} />
          </Modal>
        }
      </React.Fragment>
    );
  }
}

export default QuestionsContainer;
