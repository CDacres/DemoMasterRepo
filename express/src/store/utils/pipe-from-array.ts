// import { of as rxOf, Observable, OperatorFunction, UnaryFunction } from 'rxjs';
// import { map } from 'rxjs/operators';

// export default function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R> {
//   const ops = [map((x) => x)];
//   const result = ops.reduce((ob: Observable<{}>, op: OperatorFunction<{}, {}>) => ob.pipe(op), rxOf(1, 2, 3));
//   return result.subscribe(value => console.log(value));
// }

// https://github.com/ReactiveX/rxjs/issues/3989
// https://stackoverflow.com/questions/51860068/rxjs-6-conditionally-pipe-an-observable
// http://miles-johnson.me/modules/utils.html

export default (() => null);
