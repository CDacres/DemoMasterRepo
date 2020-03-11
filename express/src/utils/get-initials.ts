export default function getInitials(stringArr: any[]) {
  let retInitials = '';
  stringArr.forEach((str) => {
    retInitials += str.charAt(0).toUpperCase();
  });
  return retInitials;
}
