import * as React from 'react';
import Router from 'next/router';
import { resolve } from 'url';
import qs from 'qs';

// Connectors
import { useSearch } from '@src/store/connectors';

// Components
import URLGen from '@src/components/abstract/URLGen';

// Types
import { LinkComponentProps } from '@src/typings/types';

// type ChildProps = {
//   href?: string;
//   onClick: (e: any) => void;
// };

class SearchLink extends React.PureComponent<LinkComponentProps> {
  static defaultProps = {
    prefetch: false,
    shallow: false,
  };

  componentDidMount() {
    this.prefetch();
  }

  componentDidUpdate(prevProps: LinkComponentProps) {
    const { href } = this.props;
    if (JSON.stringify(prevProps.href) !== JSON.stringify(href)) {
      this.prefetch();
    }
  }

  linkClicked = e => {
    e.preventDefault();
    const { href, startSearch } = this.props;

    let query = {};

    if (href.indexOf('?')) {
      const pathnameArr = href.split('?');
      query = qs.parse(pathnameArr[1]);
    }

    startSearch(href, query);
  }

  prefetch = () => {
    const { href, prefetch } = this.props;
    if (!prefetch) {
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }
    // Prefetch the JSON page if asked (only in the client)
    const { pathname } = window.location;
    const link = resolve(pathname, href);
    Router.prefetch(link);
  }

  render() {
    const { href } = this.props;
    let { children } = this.props;

    // If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag
    if (typeof children === 'string') {
      children = <a>{children}</a>;
    }

    // This will return the first child, if multiple are provided it will throw an error
    // const child = React.Children.only(children);
    // const props: ChildProps = {
    //   onClick: e => {
    //     // if (child.props && typeof child.props.onClick === 'function') {
    //     //   child.props.onClick(e);
    //     // }
    //     if (!e.defaultPrevented) {
    //       this.linkClicked(e);
    //     }
    //   },
    // };

    return (
      <URLGen url={href === '/' ? '' : href}>
        {/* {fullUrl => {
          // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
          // defined, we specify the current 'href', so that repetition is not needed by the user
          // if (child.type === 'a' && !('href' in child.props)) {
          //   props.href = fullUrl;
          // }

          // return React.cloneElement(child, props);
        }} */}
      </URLGen>
    );
  }
}

export default useSearch(SearchLink);
