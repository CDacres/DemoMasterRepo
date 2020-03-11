// Utils
import { objectify } from '@src/utils';

// Types
import { QueryStringObject, SearchQueryObject } from '@src/typings/types';

export default function generateQueryStringObject({
  includes,
  // filters,
  fields,
}: SearchQueryObject): QueryStringObject {
  const query: QueryStringObject = {};
  if (includes) {
    query.includes = includes.join(',');
  }
  // if (filters) {
  //   query.filters =
  // }
  if (fields) {
    query.fields = Object.keys(fields)
      .map(key => {
        if (fields[key] instanceof Array) {
          return [key, fields[key].join(',')];
        }
        return [key, fields[key]];
      })
      .reduce(objectify, {});
  }
  return query;
}
