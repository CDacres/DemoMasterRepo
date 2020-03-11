import { Action } from 'redux';
import { ActionsObservable, combineEpics, Epic, StateObservable } from 'redux-observable';
import { BehaviorSubject, ObservableInput } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// Create epic stream
let epic$;

let dynamicallyAddedEpics = [];

const checkForDuplicateEpic = (...args) =>
  args.some(arg => dynamicallyAddedEpics.indexOf(arg) >= 0);

export const addEpicsToStream = (...args) => {
  if (!checkForDuplicateEpic(...args)) {
    dynamicallyAddedEpics = [...dynamicallyAddedEpics, ...args];
    const asyncEpics = combineEpics(...args);
    epic$.next(asyncEpics);
  }
};

export default function createRootEpic(combinedEpics: Epic) {
  epic$ = new BehaviorSubject(combinedEpics);
  return (...args) => epic$.pipe(
    mergeMap(
      (epic: (action$?: ActionsObservable<Action>, state$?: StateObservable<any>) => ObservableInput<{}>) =>
        epic(...args)
    )
  );
}
