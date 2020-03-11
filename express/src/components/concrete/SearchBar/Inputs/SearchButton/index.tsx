/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import searchBarStyles from '../../styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  // onClick: (event: React.MouseEvent) => Promise<void>; // turn off this for hackForHandleSubmit
  onClick: (event: any) => void;
};

const SearchButton = ({ onClick }: Props) => (
  <div className={css(searchBarStyles.searchBarInputContainer, searchBarStyles.searchBarSearchButtonContainer, pagestyles.tableCellMiddle)}>
    <button
      className={css(searchBarStyles.searchBarSearchButton)}
      onClick={onClick}
      type="submit"
    >
      <Translatable content={{ transKey: 'common.search' }} />
    </button>
  </div>
);

export default SearchButton;
