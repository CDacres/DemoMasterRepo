type ActionCreator = (...args: any[]) => ({
  type: string;
  [propName: string]: any;
});

export default function createActionCreator(type: string, ...argNames: string[]): ActionCreator {
  return (...args) => {
    const action = { type };
    argNames.forEach((_, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}
