/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { Close, Magnify } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';
import ExploreDropdown from '@src/components/concrete/Header/SearchBar/ExploreDropdown';

// Types
import { Search } from '@src/typings/types';

type Props = {
  children: JSX.Element;
  isInputActive: boolean;
  recentSearches: Search;
  url: string;
};

const SearchBarComponent = ({ children, isInputActive, recentSearches, url }: Props) => (
  <div>
    <div className={css(styles.searchBar)}>
      <div>
        <div className={css(styles.searchBarWrapper, isInputActive ? styles.searchBarWrapperExtended : styles.searchBarWrapperReduced)}>
          <div className={css(styles.searchBarWrapperInnerSmall)}>
            <div className={css(styles.searchBarContainer, isInputActive ? styles.searchBarContainerExtended : styles.searchBarContainerReduced)}>
              <div className={css(styles.searchBarInput, isInputActive ? styles.searchBarInputExtended : null)}>
                <form
                  action={url}
                  method="get"
                >
                  <div dir="ltr">
                    <div className={css(styles.searchForm, padding.left_1_5, padding.right_0_5)}>
                      <label
                        className={css(styles.searchFormLabel, margin.all_0, padding.all_0)}
                        htmlFor="searchInput"
                      >
                        <Translatable content={{ transKey: 'common.search' }}>
                          <span className={css(styles.searchFormLabelText, padding.all_0)} />
                        </Translatable>
                        <div className={css(styles.searchFormIconWrapper, pagestyles.tableCellMiddle, isInputActive ? styles.searchFormIconWrapperExtended : null)}>
                          <Magnify stylesArray={[pagestyles.icon, pagestyles.icon18]} />
                        </div>
                        <div className={css(styles.searchFormInputWrapper, pagestyles.tableCellMiddle)}>
                          <div className={css(styles.searchFormInputContainer)}>
                            {children}
                          </div>
                        </div>
                      </label>
                      <div className={css(styles.searchClearWrapper, isInputActive ? styles.searchClearWrapperExtended : pagestyles.none)}>
                        <div className={css(pagestyles.inlineBlockMiddle)}>
                          <Button
                            aria-label="Clear Input"
                            stylesArray={[styles.searchClearButton]}
                          >
                            <Close stylesArray={[pagestyles.icon, pagestyles.icon12]} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className={css(styles.searchCancel, isInputActive ? styles.searchCancelExtended : styles.searchCancelReduced)}>
                {isInputActive ? (
                  <Translatable content={{ transKey: 'common.cancel' }}>
                    <Button
                      aria-busy="false"
                      stylesArray={[styles.searchCancelButton]}
                    />
                  </Translatable>
                ) : (
                  <Button
                    aria-busy="false"
                    stylesArray={[styles.searchCancelButton]}
                  />
                )}
              </div>
            </div>
          </div>
          <ExploreDropdown
            isInputActive={isInputActive}
            recentSearches={recentSearches}
          />
        </div>
      </div>
    </div>
  </div>
);

export default SearchBarComponent;
