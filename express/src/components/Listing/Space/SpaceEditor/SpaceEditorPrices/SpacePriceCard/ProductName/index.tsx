import * as React from 'react';

// Core
import { Catalog } from '@src/core';
import { PriceModelMeta, ProductPrice } from '@src/core/domain';
import { priceModelCatalog } from '@src/core/meta';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  price: ProductPrice;
};

const ProductName = ({ price }: Props) => {
  const priceModelMeta: Catalog<PriceModelMeta> = priceModelCatalog;
  if (price.name !== '') {
    return (
      <Spell word={price.name} />
    );
  } else {
    const catalogPrice = priceModelMeta.byId[price.model];
    if (typeof catalogPrice !== 'undefined') {
      return (
        <Spell word={catalogPrice.add.label} />
      );
    } else {
      return null;
    }
  }
};

export default ProductName;
