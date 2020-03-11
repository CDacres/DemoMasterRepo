import * as React from 'react';
import { Action } from 'redux';

// Types
import { RouteOptions } from '@src/typings/types';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  forceDomain?: boolean;
  href: string;
  itemProp?: string;
  prefetch?: boolean;
  rel?: string;
  role?: string;
  routeActions?: {
    prefetch: () => void;
    navigate: (options?: RouteOptions) => Action;
  };
  scroll?: boolean;
  tabIndex?: number;
  target?: string;
  title?: string;
};

type ChildProps = {
  className?: string;
  itemProp?: string;
  onClick: (e: React.MouseEvent) => void;
  rel?: string;
  role?: string;
  tabIndex?: number;
  target?: string;
  title?: string;
};

class Link extends React.PureComponent<Props> {
  static defaultProps = {
    prefetch: false,
    scroll: true,
  };

  componentDidMount() {
    this.prefetch();
  }

  componentDidUpdate(prevProps: Props): void {
    const { href } = this.props;
    if (JSON.stringify(prevProps.href) !== JSON.stringify(href)) {
      this.prefetch();
    }
  }

  linkClicked = e => {
    e.preventDefault();

    const { href } = this.props;
    let { scroll } = this.props;

    if (scroll == null) {
      scroll = href.indexOf('#') < 0;
    }

    const options = {
      scroll,
    };

    this.props.routeActions.navigate(options);
  }

  prefetch = () => {
    const { prefetch } = this.props;
    if (prefetch) {
      this.props.routeActions.prefetch();
    }
  }

  render() {
    const { href } = this.props;
    let { children } = this.props;
    if (typeof children === 'string') {
      children = (
        <React.Fragment>
          {children}
        </React.Fragment>
      );
    }
    // This will return the first child, if multiple are provided it will throw an error
    // const child = React.Children.only(children);
    const props: ChildProps = {
      className: this.props.className,
      onClick: e => {
        // if (child.props && typeof child.props.onClick === 'function') {
        //   child.props.onClick(e);
        // }
        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      },
      role: this.props.role,
      title: this.props.title,
    };
    return (
      <a
        href={href}
        {...props}
      >
        {children}
      </a>
    );
  }
}

export default Link;
