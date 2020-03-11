import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  optionWrapper: {
    borderTop: '1px dotted #dedddd',
    zIndex: 1,
    position: 'relative',
    borderRadius: '2px',
    lineHeight: '22px',
    ':hover': {
      background: '#f7f7f7',
      borderTop: '1px solid #f7f7f7',
      borderBottom: '1px solid #f7f7f7',
      cursor: 'pointer',
      margin: '0px 0px -1px',
      zIndex: 2,
      ':first-child': {
        borderTop: 'none',
      },
      ':last-child': {
        borderBottom: 'none',
      },
    },
    ':first-child': {
      borderTop: 'none',
    },
    ':last-child': {
      borderBottom: 'none',
      ':hover': {
        margin: '0px',
      },
    },
    ':after': {
      content: '" "',
      display: 'block',
      clear: 'both',
    },
  },
  option: {
    fontSize: '16px',
    padding: '8px 0px',
    ':hover': {
      padding: '8px 12px',
    },
  },
  optionFirstLine: {
    ':after': {
      content: '" "',
      display: 'block',
      clear: 'both',
    },
  },
  mobileOption: {
    fontSize: '18px',
    padding: '24px 0px',
    ':hover': {
      padding: '24px 12px',
    },
  },
  optionFirstLineChild: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowWrap: 'break-word',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  optionSecondLine: {
    color: '#b2b2b2',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowWrap: 'break-word',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  title: {
    float: 'left',
    maxWidth: '60%',
  },
  price: {
    float: 'right',
    maxWidth: '40%',
  },
  originalPrice: {
    marginRight: '12px',
    textDecoration: 'line-through',
  },
  discountPrice: {
    color: '#00c6ff',
    fontWeight: 'bold',
  },
  selected: {
    background: '#f7f7f7',
    borderTop: '1px solid #ebebeb',
    borderBottom: '1px solid #ebebeb',
    margin: '0px 0px -1px',
    padding: '8px 12px',
    zIndex: 2,
    ':first-child': {
      borderTop: '1px solid #ebebeb',
    },
  },
  selectedTitle: {
    background: 'url("_express/images/commonsite/bullet-option.png") left center no-repeat',
    fontWeight: 'bold',
    color: '#333',
  },
});
