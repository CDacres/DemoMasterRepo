import * as React from 'react';
import { ConnectionsType } from './connections';

export const ConnectionsContext = React.createContext<ConnectionsType | null>(null);
