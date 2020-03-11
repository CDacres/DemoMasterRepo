export const uid = () => {
  const abc = 'abcdef1234567890'.split('');
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += abc[Math.floor(Math.random() * abc.length)];
  }
  return token;
};
