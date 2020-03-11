/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import FilterItems from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader/Filters/FilterItems';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import Button from '@src/components/concrete/Button';
import { Search, SliderDashboard } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  children?: JSX.Element;
  onApply: () => void;
  onChange: () => void;
  onClear: () => void;
  opened: boolean;
  toggleDropDown: (e: any) => void;
  typingOn: boolean;
};

const FiltersComponent = ({ children, onApply, onChange, onClear, opened, toggleDropDown, typingOn }: Props) => (
  <form className={css(styles.form, padding.topbottom_0_75, padding.leftright_1_5, typingOn ? styles.formTypingMode : null)}>
    <div className={css(styles.inputWrapper)}>
      <div className={css(pagestyles.tableCellMiddle)}>
        <div>
          <Search stylesArray={[pagestyles.icon, pagestyles.icon18]} />
        </div>
      </div>
      <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
        <div className={css(margin.leftright_0_5)}>
          <Translatable attributes={{ placeholder: { transKey: 'common.table_search_placeholder' } }}>
            <StyledInput
              id="search_input"
              name="search_input"
              noBorder={true}
              noMargin={true}
              onChange={onChange}
              smallText={true}
            />
          </Translatable>
        </div>
      </div>
      {React.Children.count(children) > 0 &&
        <div className={css(pagestyles.tableCellMiddle)}>
          <div className={css(styles.sliderWrapper)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div className={css(styles.sliderContainer)}>
                <Button
                  action={toggleDropDown}
                  stylesArray={[styles.sliderButton, padding.all_0]}
                >
                  <div className={css(margin.all_1)}>
                    <div className={css(styles.inputWrapper)}>
                      <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                        <SliderDashboard stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconBlue]} />
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
    {(React.Children.count(children) > 0 && opened) &&
      <FilterItems
        onApply={onApply}
        onClear={onClear}
      >
        {children}
      </FilterItems>
    }
  </form>
);

export default FiltersComponent;
