import * as React from 'react';
import Auto from 'react-autosuggest';

// MaterialUI
import { List as ListUI } from '@material-ui/core';

const List = ({ children, containerProps }: Auto.RenderSuggestionsContainerParams) => (
  <ListUI {...containerProps}>
    {children}
  </ListUI>
);

export default List;
