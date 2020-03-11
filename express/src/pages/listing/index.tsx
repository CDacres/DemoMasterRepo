import * as React from 'react';

import VenuePageWrapper from '@src/components/Listing/Venue/VenuePage/VenuePageWrapper';
import withLegacy from '@src/components/pagebuilders/legacy';
import { NextComponentType, NextPageContext } from 'next';

type Props = {
  urlString: string;
};

type Ctx = NextPageContext;

// type FunctionRequiringConnection = (connections: ConnectionsType, ...args: any) => any;

// type ShouldBeConnected<T> = {
//   [K in keyof T]: FunctionRequiringConnection;
// };

// type HydrateMethods<H extends ShouldBeConnected<H>> = {
//   [P in keyof H]: (...arg: RemoveFirstFromTuple<Parameters<H[P]>>) => ReturnType<H[P]>
// };

// type EffectsRequiringConnection = {
//   fetchListingsData: FunctionRequiringConnection;
// };

// const me: EffectsRequiringConnection = {
//   fetchListingsData,
// };

// type RemoveFirstFromTuple<T extends any[]> =
//   T['length'] extends 0 ? undefined :
//   (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : []);

// type Test = HydrateMethods<EffectsRequiringConnection>;

const DynamicVenuePage: NextComponentType<Ctx, Props, Props> = (props) => {
  const { urlString } = props;
  return (
    <VenuePageWrapper url={urlString} />
  );
};

DynamicVenuePage.getInitialProps = async ({ req, asPath }): Promise<Props> => {
  const isServer = !!req;
  return { urlString: isServer ? req.url : asPath };
};

export default withLegacy(DynamicVenuePage);
