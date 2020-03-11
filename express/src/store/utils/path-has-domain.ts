export default function pathHasDomain(pathname: string) {
  const regExp = new RegExp(/^(\/[a-zA-Z]{2}\/)/);
  if (regExp.test(pathname)) {
    return true;
  }
  return false;
}
