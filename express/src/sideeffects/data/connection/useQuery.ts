import { ConnectionsType } from '@src/sideeffects/connections';

type QueryI<I, O, QI, QO> = {
  query: any;
  transformInput: (input: I) => QI;
  transformOutput: (result: QO) => O;
};

export function useQuery<I, O, QI, QO>({ query, transformInput, transformOutput }: QueryI<I, O, QI, QO>) {
  return (connections: ConnectionsType, input: I = null): Promise<O> => {
    return connections.data.query<QO, QI>({
      query,
      variables: transformInput(input),
    }).then(result => transformOutput(result.data));
  };
}
