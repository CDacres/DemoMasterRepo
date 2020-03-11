/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

const RecycleBin = () => (
  <svg
    aria-label="Delete"
    className={css(styles.image)}
    focusable="false"
    role="img"
    viewBox="0 0 24 24"
  >
    <path
      d="m21.5 3h-4.5v-1.5c0-.83-.67-1.5-1.49-1.5h-8.01c-.82 0-1.5.67-1.5 1.5v1.5h-4.5a.5.5 0 1 0 0 1h1.5v18.51c0 .82.68 1.49 1.5 1.49h14c .83 0 1.5-.67 1.5-1.49v-18.51h1.5a.5.5 0 0 0 0-1zm-14.5-1.5c0-.27.23-.5.5-.5h8.01c.28 0 .5.22.5.5v1.5h-9.01zm12 21.01a.49.49 0 0 1 -.5.49h-14a .5.5 0 0 1 -.5-.49v-18.51h15zm-11-16.01v14a .5.5 0 0 1 -1 0v-14a .5.5 0 1 1 1 0zm4 0v14a .5.5 0 0 1 -1 0v-14a .5.5 0 1 1 1 0zm4 0v14a .5.5 0 0 1 -1 0v-14a .5.5 0 1 1 1 0z"
      fillRule="evenodd"
    />
  </svg>
);

export default RecycleBin;
