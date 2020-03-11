import { ConnectionType as DataType, connectionFactory as dataFactory } from '../data/connection';
import { State } from '@src/state';

export type ConnectionsType = { data: DataType };
export const connectionsFactory = (state: State) => ({ data: dataFactory(state) });
