
import concatMap from '../concat-map';

describe('concatMap', () => {
  it('should apply projection function to sub arrays and concatenate', () => {
    const array = [
      [
        {
          count: 1,
        },
        {
          count: 2,
        },
      ],
      [
        {
          count: 3,
        },
        {
          count: 4,
        },
      ],
    ];
    const projectionFunction = subArr => {
      return subArr.map(item => ({ count: item.count += 1 }));
    };
    expect(concatMap(array, projectionFunction)).toEqual([
      {
        count: 2,
      },
      {
        count: 3,
      },
      {
        count: 4,
      },
      {
        count: 5,
      },
    ]);
  });
});
