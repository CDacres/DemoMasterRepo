import * as React from 'react';
import { storiesOf } from '@storybook/react';

// import Container from './container';

// import Slider, {
// // PitComponent
// } from '@src/components/concrete/Inputs/Slider';

// // const searchResults = [
// //   { price: 252 },
// //   { price: 1001 },
// //   { price: 1003 },
// //   { price: 1004 },
// //   { price: 2002 },
// //   { price: 2004 },
// //   { price: 3002 },
// //   { price: 5006 }
// // ];

// const min = 250;
// const max = 5000;

// // function createPriceArray(results) {
// //   return results
// //     .map(res => ({ value: res.price }))
// //     .reduce((acc, curr) => {
// //       if (acc.find(i => i.value === curr.value)) {
// //         return acc.map(i => {
// //           if (i.value !== curr.value) {
// //             return i;
// //           }
// //           const count = i.count += 1;
// //           return {
// //             ...i,
// //             count
// //           };
// //         });
// //       }
// //       console.log('curr: ', curr);
// //       console.log('acc: ', JSON.parse(JSON.stringify(acc)));
// //       const ret = [...acc, { ...curr, count: 1 }];
// //       console.log(ret);
// //       return ret;
// //     }, []);
// // }

// // const pitPoints = createPriceArray(searchResults);

// // console.log(pitPoints);

// // const pitPoints = searchResults.map(res => res.price);

// // const increment = (max - min) / 100;

// // const fillRange = start => {
// //   return Array(50)
// //     .fill()
// //     .map((item, index) => start + (index * increment));
// // };

// // const pitPoints = fillRange(min, max);

storiesOf('Price Slider', module)
  .add('with histogram', () => (
    <div>This needs fixing</div>
    // <Container width="345px">
    //   <div style={{ padding: '25px 0' }}>
    //     <Slider
    //       min={min}
    //       max={max}
    //       // pitComponent={PitComponent}
    //       // pitPoints={pitPoints}
    //       values={[min, max]}
    //     />
    //   </div>
    // </Container>
  ));
