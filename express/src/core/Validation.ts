export type Errors<T> = { [P in keyof T]?: string[] };
export type Validator<T> = { [P in keyof T]?: (i: T) => string[] };

export const validate = <T>(i: T, v: Validator<T>, fields?: Array<(keyof T)>): Errors<T> => {
  const errors: Errors<T> = {};
  if (fields && fields.length > 0) {
    fields.reduce((e, f) => {
      const fe = v[f] && v[f](i) || null;
      if (fe) {
        e[f] = fe;
      }
      return e;
    }, errors);
  } else {
    Object.entries(v).reduce((e, [f, fx]) => {
      // @ts-ignore
      const fe = fx(i);
      if (fe) {
        e[f] = fe;
      }
      return e;
    }, errors);
  }
  return Object.entries(errors).length > 0 ? errors : null;
};
