import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import roomInfoStyles from '../styles';

type Props = {
  desc: string | JSX.Element;
  icon: JSX.Element;
  link: string;
  text: JSX.Element;
};

const Item = ({ desc, icon, link, text }: Props) => (
  <div className={css(roomInfoStyles.itemWrapper)}>
    <a
      className={css(roomInfoStyles.link)}
      href={`#${link}`}
    >
      <span
        aria-hidden="true"
        className={css(roomInfoStyles.iconContainer)}
      >
        {icon}
      </span>
      <span className={css(roomInfoStyles.textContainer)}>
        <div className={css(roomInfoStyles.text)}>
          {text}
        </div>
      </span>
      <span className={css(roomInfoStyles.descriptionContainer)}>
        <div className={css(roomInfoStyles.description)}>
          {desc}
        </div>
      </span>
    </a>
  </div>
);

export default Item;
