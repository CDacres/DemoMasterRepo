import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

type Props = {
  dateTime: {
    date?: {
      desc: string;
      text: string;
    };
    time?: {
      desc: string;
      text: string;
    };
  };
};

const DetailDate = ({ dateTime }: Props) => (
  <React.Fragment>
    {dateTime.date &&
      <React.Fragment>
        <span className={css(pagestyles.hiddenText)}>
          {dateTime.date.desc}
        </span>
        {dateTime.date.text}
      </React.Fragment>
    }
    {dateTime.time &&
      <React.Fragment>
        <span className={css(pagestyles.hiddenText)}>
          {dateTime.time.desc}
        </span>
        {dateTime.date &&
          <React.Fragment>
            {' '}
          </React.Fragment>
        }
        {dateTime.time.text}
      </React.Fragment>
    }
  </React.Fragment>
);

export default DetailDate;
