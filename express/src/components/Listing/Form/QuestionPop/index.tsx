import * as React from 'react';
import { css } from 'aphrodite/no-important';

// MaterialUI
import { Paper as PaperUI, Tooltip as TooltipUI } from '@material-ui/core';

// Styles
import styles from './styles';

// Components
import { LearnMore } from '@src/components/concrete/Icons/svgs';

type Props = {
  content: React.ReactNode;
};

const QuestionPop = ({ content }: Props) => (
  <TooltipUI
    title={
      <PaperUI>
        {content}
      </PaperUI>
    }
  >
    <div className={css(styles.container)}>
      <LearnMore stylesArray={[styles.icon]} />
    </div>
  </TooltipUI>
);

export default QuestionPop;
