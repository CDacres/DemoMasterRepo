import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { Ref } from '@src/core';
import { ProductCategory, ProductCategoryMeta } from '@src/core/domain';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import ListCard from '@src/components/Listing/Layout/Cards/ListCard';
import Icon from '@src/components/Listing/Icons/Icon';
import Headings from '@src/components/Listing/Titles/Headings';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  itemsSource: ProductCategoryMeta[];
  onChange: (value: ProductCategory) => void;
  value: Ref;
};

class ProductCategoryInput extends React.Component<Props> {

  handleChange = (value: ProductCategory) => () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { itemsSource, value } = this.props;
    return (
      <div className={css(styles.productCategoryContainer)}>
        {itemsSource.map((i, k) => (
          <ListCard
            cardPaddingType="all"
            hasSelectedIndicator={true}
            isSelected={value === i.id}
            key={k}
            name="category"
            onClick={this.handleChange(i.id)}
            stylesArray={{
              area: [styles.area],
              container: [styles.container],
            }}
          >
            <div>
              <Icon
                icon={i.icon}
                stylesArray={[pagestyles.icon32]}
              />
              <Headings
                stylesArray={[styles.descTitle, pagestyles.block, margin.top_3]}
                tag="h4"
              >
                <Spell word={i.description} />
              </Headings>
              <Headings
                stylesArray={[pagestyles.block, margin.top_1]}
                tag="h5"
              >
                <Spell word={i.subtitle} />
              </Headings>
            </div>
          </ListCard>
        ))}
      </div>
    );
  }
}

export default ProductCategoryInput;
