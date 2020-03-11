import * as React from 'react';
import { resolve } from 'url';
import Router from 'next/router';

// Connectors
import { useConfig } from '@src/store/connectors';

// Types
import { Route, RouteOptions, Store } from '@src/typings/types';

// Routes
import routes from '@src/routes';

type Props = {
  children: (url: string, routeActions: object) => JSX.Element;
  config: Store.Config;
  forceDomain?: string;
  url: string;
  navigate: (route: Route, options?: RouteOptions) => void;
};
type RouteActions = {
  prefetch: () => void;
  navigate: (options?: object) => void;
};

class URLGen extends React.PureComponent<Props> {
  navigationBuilder = (route: Route): (options?: RouteOptions) => void => {
    return (options) => this.props.navigate(route, options);
  }

  prefetchBuilder = (route: Route): () => void => {
    return () => {
      if (typeof window === 'undefined') {
        return;
      }

      // Prefetch the JSON page if asked (only in the client)
      const { pathname } = window.location;
      const link = resolve(pathname, route.pathname);
      Router.prefetch(link);
    };
  }

  getRouteActions = (url: string): RouteActions => {
    const originalRoute = routes.get(url);
    if (typeof originalRoute !== 'undefined' && originalRoute.filePath) {
      const route = {
        ...originalRoute,
        pathname: url.replace(new RegExp(originalRoute.regExp), originalRoute.pathname),
      };
      return {
        prefetch: this.prefetchBuilder(route),
        navigate: this.navigationBuilder(route),
      };
    }
    return null;
  }

  generateRouteHelper = () => {
    const { config: { domain }, forceDomain, url } = this.props;
    const routeActions = this.getRouteActions(url);
    return {
      fullUrl: `/${forceDomain ? forceDomain : domain}${url}`,
      routeActions: routeActions,
    };
  }

  render() {
    const routeHelper = this.generateRouteHelper();
    return (
      <React.Fragment>
        {this.props.children(routeHelper.fullUrl, routeHelper.routeActions)}
      </React.Fragment>
    );
  }
}

export default useConfig(URLGen);
