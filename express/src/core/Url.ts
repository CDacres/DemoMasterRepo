export const urlQuery = (baseUrl: string, map: any): string => {
  const url = baseUrl || '';
  const args = [];

  for (const [key, value] of Object.entries(map)) {
    args.push(`${key}=${encodeURI(value + '')}`);
  }
  const pure = url.indexOf('?') === -1;
  const needLeading = !pure && url.lastIndexOf('&') !== url.length - 1;
  return url + (pure ? '?' : '') + (needLeading ? '&' : '') + args.join('&');
};
