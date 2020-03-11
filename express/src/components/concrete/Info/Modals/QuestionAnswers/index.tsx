import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Question } from '@src/typings/types';

type Props = {
  question: Question;
};

const QuestionAnswers = ({ question }: Props) => (
  <React.Fragment>
    <ModalTop text={question.text} />
    <section>
      <div className={css(pagestyles.text, margin.all_0)}>
        <div>
          {question.answers.map((answer, index) => (
            <Translatable
              content={{ transKey: answer }}
              key={index}
            >
              <p />
            </Translatable>
          ))}
        </div>
      </div>
    </section>
  </React.Fragment>
);

export default QuestionAnswers;
