import * as React from 'react';

// Components
// import Link from './Link';
// import ExternalLink from './ExternalLink';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
// import { useConfig } from '@src/store/connectors';
import URLGen from '@src/components/abstract/URLGen';

// Types
import { LinkProp, BrowserLinkProps } from '@src/typings/types';

const BrowserLink = ({ attributes, children, forceDomain, href, prefetch, ...props }: LinkProp & BrowserLinkProps) => (
  <URLGen
    forceDomain={forceDomain}
    url={href === '/' ? '' : href}
  >
    {(fullUrl
      // routeActions
    ) => {
      // if (routeActions) {
      if (false) {
        // return (
        //   <Translatable attributes={attributes}>
        //     <Link
        //       {...props}
        //       href={fullUrl}
        //       prefetch={prefetch}
        //       routeActions={routeActions}
        //     >
        //       {children}
        //     </Link>
        //   </Translatable>
        // );
      } else {
        return (
          <Translatable attributes={attributes}>
            <a
              {...props}
              href={fullUrl}
            >
              <React.Fragment>
                {children}
              </React.Fragment>
            </a>
          </Translatable>
        );
      }
    }}
  </URLGen>
);

export default BrowserLink;
