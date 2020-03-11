/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ExploreDropdownItem from '@src/components/concrete/Header/SearchBar/ExploreDropdown/ExploreDropdownItem';
import RecentItem from '@src/components/concrete/Header/SearchBar/ExploreDropdown/RecentItem';

// Data
import { verticalsData } from '@src/data/search';

// Types
import { Search } from '@src/typings/types';

type Props = {
  isInputActive: boolean;
  recentSearches: Search;
};

const ExploreDropdown = ({ isInputActive, recentSearches }: Props) => (
  <div
    aria-label="Search suggestions"
    className={css(styles.suggestions, isInputActive ? styles.suggestionsExtended : styles.suggestionsReduced)}
    id="search_suggestions"
    role="listbox"
  >
    <ul className={css(styles.suggestionList, margin.all_0, padding.all_0, isInputActive ? styles.suggestionListExtended : styles.suggestionListReduced)}>
      <li className={css(styles.suggestionListItem, margin.all_0, padding.all_0)}>
        {/* TODO: this is where the autocomplete would be */}
        <div className={css(margin.topbottom_2, margin.leftright_3, margin.leftright_4_small)}>
          <div className={css(pagestyles.smallSubtitle, pagestyles.fontBlack, margin.all_0)}>
            <Translatable content={{ transKey: 'search.explore' }}>
              <span className={css(styles.suggestionTitleText)} />
            </Translatable>
          </div>
        </div>
        <ul className={css(margin.top_0, margin.leftright_0, margin.bottom_2, padding.topbottom_0, padding.leftright_3, padding.leftright_4_small)}>
          {verticalsData.en.data.map((item, index) => (
            <ExploreDropdownItem
              index={index}
              key={shortid.generate()}
              selected={index === 0 ? true : false}
              title={item.text}
            />
          ))}
        </ul>
      </li>
      <li className={css(styles.suggestionListItem, margin.all_0, padding.all_0)}>
        <div className={css(margin.topbottom_2, margin.leftright_3, margin.leftright_4_small)}>
          <div className={css(pagestyles.smallSubtitle, pagestyles.fontBlack, margin.all_0)}>
            <Translatable content={{ transKey: 'search.recent_searches' }}>
              <span className={css(styles.suggestionTitleText)} />
            </Translatable>
          </div>
        </div>
        <ul className={css(margin.top_0, margin.leftright_0, margin.bottom_2, padding.all_0)}>
          {recentSearches.map((search, index) => (
            <RecentItem
              index={index}
              key={shortid.generate()}
              subtitle={search.date}
              title={search.text}
            />
          ))}
        </ul>
      </li>
    </ul>
  </div>
);

export default ExploreDropdown;
