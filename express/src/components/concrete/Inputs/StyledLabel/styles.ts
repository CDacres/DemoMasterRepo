import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  required: {
    ':after': {
      color: 'red',
      content: '"*"',
      display: 'inline-block',
      paddingLeft: '5px',
    },
  },
});
