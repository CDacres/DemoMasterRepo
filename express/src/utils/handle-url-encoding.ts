export default function handleUrlEncoding(pathname: string) {
  return decodeURIComponent(pathname.split(/\/(.+)/)[1]);
}
