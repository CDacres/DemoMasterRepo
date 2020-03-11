/* tslint:disable:max-line-length */
import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  breadcrumbsWrapper: {
    margin: '0px auto',
    minHeight: '44px',
    padding: '10px 0px',
  },
  breadcrumbsList: {
    maxHeight: '9999px',
    direction: 'ltr',
    listStyle: 'none',
  },
  breadcrumb: {
    display: 'inline-block',
    marginRight: '1em',
    color: '#787878',
    lineHeight: '12px',
    padding: '3px 0px',
    whiteSpace: 'nowrap',
  },
  breadcrumbChild: {
    fontSize: '14px',
    color: '#787878',
    lineHeight: '12px',
  },
  breadcrumbSubsequent: {
    ':before': {
      width: '8px',
      height: '18px',
      backgroundSize: '8px 18px',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAASCAYAAABmQp92AAAAbUlEQVQokZ2RMRGAMBRDK6ESkIAEJCABCZWABCQgAQk4oEuS8SOFhbUpR+bc5SVJqSdJA4DDmkjuJEvTEBEZQJU02SiSd0RkFzUDqJYHwEpy60GfkpYuNIDxn8FGWEhb0w71Ql3Nqe1Zn+52egAmnnDCe3EoxgAAAABJRU5ErkJggg==)',
      marginRight: '11px',
      content: '""',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginTop: '-1px',
    },
  },
  breadcrumbLink: {
    textDecoration: 'underline',
  },
});
