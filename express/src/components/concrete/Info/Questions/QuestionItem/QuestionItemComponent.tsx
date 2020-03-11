import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Question } from '@src/typings/types';

type Props = {
  onClick: (question: Question) => void;
  question: Question;
};

const QuestionItemComponent = ({ onClick, question }: Props) => (
  <div>
    <div className={css(padding.topbottom_3)}>
      <div>
        <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
          <InteractionButton action={onClick}>
            <div className={css(pagestyles.subtitle, pagestyles.fontBook, margin.all_0)}>
              <div>
                <Translatable content={{ transKey: question.text }}>
                  <div className={css(styles.text)} />
                </Translatable>
              </div>
            </div>
          </InteractionButton>
        </span>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </div>
);

export default QuestionItemComponent;
