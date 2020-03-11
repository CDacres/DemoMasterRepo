import { ConnectionsType } from '@src/sideeffects/connections';

export type MutationI<I, O, QI, QO> = {
  mutation: any;
  transformInput: (input: I) => QI;
  transformOutput: (result: QO) => O;
};

export function useMutation<I, O, QI, QO>({
  mutation, transformInput, transformOutput }: MutationI<I, O, QI, QO>) {
  return (connections: ConnectionsType, input: I): Promise<O> => {
    return connections.data.mutate<QO, QI>({
      mutation,
      variables: transformInput(input),
    }).then(result => transformOutput(result.data));
  };
}
