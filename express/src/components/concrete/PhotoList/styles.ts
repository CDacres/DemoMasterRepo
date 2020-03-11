import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  addButton: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    fontSize: '100px',
    lineHeight: '130px',
  },
  addButtonContainer: {
    userSelect: 'none',
    width: '150px',
    flex: 'none',
    textAlign: 'center',
  },
  deleteButton: {
    cursor: 'pointer',
    userSelect: 'none',
    background: 'none',
    color: '#fff',
    outline: 'none',
    border: '0px none',
    fontSize: '24px',
    float: 'right',
  },
  dragList: {
    flex: 1,
  },
  listContainer: {
    display: 'flex',
    overflow: 'auto',
    padding: '8px',
  },
  listItem: {
    display: 'block',
    width: '100%',
    height: '136px',
    userSelect: 'none',
    margin: '0px 8px 0px 0px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  photoList: {
    display: 'flex',
    boxShadow: '0px 8px 24px 0px hsla(0, 0%, 94%, 0.5)',
  },
});
