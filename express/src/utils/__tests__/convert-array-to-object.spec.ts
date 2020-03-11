
import convertArrayToObject from '../convert-array-to-object';

describe('convertArrayToObject', () => {
  it('should return the correct response object when supplied with a params array', () => {
    const paramsArr = ['s', 'meeting', 'London--UK'];
    const responseObj = convertArrayToObject(paramsArr);
    expect(responseObj).toEqual({
      '0': 's',
      '1': 'meeting',
      '2': 'London--UK',
    });
  });
});
