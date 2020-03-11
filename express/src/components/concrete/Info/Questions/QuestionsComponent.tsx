import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import QuestionItem from '@src/components/concrete/Info/Questions/QuestionItem';

// Types
import { Question } from '@src/typings/types';

type Props = {
  questions: {
    left: Question[];
    right: Question[];
  };
  onClick: (question: Question) => void;
};

const QuestionsComponent = ({ onClick, questions }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.halfColumnLargeScreen, padding.leftright_1)}>
          {questions.left.map((question, index) => (
            <QuestionItem
              key={index}
              onClick={onClick}
              question={question}
            />
          ))}
        </div>
        <div className={css(pagestyles.column, pagestyles.halfColumnLargeScreen, padding.leftright_1)}>
          {questions.right.map((question, index) => (
            <QuestionItem
              key={index}
              onClick={onClick}
              question={question}
            />
          ))}
        </div>
      </div>
    </div>
  </SectionInner>
);

export default QuestionsComponent;
