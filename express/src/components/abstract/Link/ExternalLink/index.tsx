import * as React from 'react';

// Components
import URLGen from '@src/components/abstract/URLGen';

// Types
import { LinkProp, BrowserLinkProps } from '@src/typings/types';

class ExternalLink extends React.PureComponent<LinkProp & BrowserLinkProps> {
  render() {
    const { className, forceDomain, href, itemProp, rel, role, tabIndex, target } = this.props;
    let { children } = this.props;

    if (typeof children === 'string') {
      children = <React.Fragment>{children}</React.Fragment>;
    }

    return (
      <URLGen
        forceDomain={forceDomain}
        url={href === '/' ? '' : href}
      >
        {fullUrl => {
          return (
            <a
              className={className}
              href={fullUrl}
              itemProp={itemProp}
              rel={rel}
              role={role}
              tabIndex={tabIndex}
              target={target}
            >
              {children}
            </a>
          );
        }}
      </URLGen>
    );
  }
}

export default ExternalLink;
