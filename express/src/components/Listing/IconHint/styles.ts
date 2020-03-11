import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    height: '50px',
    width: '50px',
    cursor: 'pointer',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.04)',
    backgroundColor: 'white',
    borderWidth: '0px',
    borderStyle: 'initial',
    borderColor: 'initial',
    borderImage: 'initial',
    borderRadius: '50%',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    overflow: 'hidden',
  },
  close: {
    fontSize: '24px',
    textAlign: 'right',
  },
  text: {
    padding: '0px 16px 16px',
  },
});
