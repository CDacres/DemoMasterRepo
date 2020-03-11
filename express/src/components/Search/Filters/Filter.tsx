import * as React from 'react';
import moment from 'moment';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Types
import { AttachClearAction, HandleFilterChange, Store } from '@src/typings/types';

export type FilterProps = {
  attachClearAction: AttachClearAction;
  isLarge?: boolean;
  isLast?: boolean;
  lang: Store.Lang;
  onFilterChange: HandleFilterChange;
  setButtonText: (buttonText: string | moment.Moment) => void;
  setSearchParams: (params: Store.Search.Params) => void;
  toggleCanClear: (bool?: boolean) => void;
};

abstract class SearchFilter<P extends FilterProps, S> extends React.PureComponent<P, S> {
  abstract applyFilter: () => void;
  abstract clearFilter: () => void;
  abstract generateButtonText: () => void;
  abstract prepareToApply: () => void;

  protected translationHelper;

  constructor(props: P) {
    super(props);
    this.translationHelper = new TranslationHelper({ messages: props.lang });
  }
}

export default SearchFilter;
