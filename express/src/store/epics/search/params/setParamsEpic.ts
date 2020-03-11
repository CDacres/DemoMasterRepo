import { ofType } from 'redux-observable';
import { concat as rxConcat, of as rxOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Actions
import { SET_SEARCH_PARAMS } from '@src/store/modules/search/params';
import { setVertical } from '@src/store/modules/search/verticals';

// Utils
import { getVerticalFromTag } from '@src/utils';

export default (action$, state$) => action$.pipe(
  ofType(SET_SEARCH_PARAMS),
  switchMap(({ params }) => {
    const { search: { tags: { tags }, verticals: { defaults, selected } } } = state$.value;
    const { tag } = params;
    const actions = [];
    if (tag) {
      const { tagObj, vertical } = getVerticalFromTag(defaults, tags, tag);
      if ((tagObj && vertical) && (!selected.tagId || (selected.tagId !== tagObj.quickVerticalId))) {
        actions.push(rxOf(setVertical(vertical)));
      }
    }
    return rxConcat(...actions);
  })
);
