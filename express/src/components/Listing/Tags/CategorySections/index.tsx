/* tslint:disable:max-line-length */
import * as React from 'react';

// Core
import { Catalog } from '@src/core';
import { ProductCategoryMeta } from '@src/core/domain';
import { productCategoryCatalog, spaceKindCatalog } from '@src/core/meta';

// Components
import EagleVisionOrForce from '@src/components/abstract/Permissions/EagleVisionOrForce';
import { TagImageMethods, TagImageParent } from '@src/components/Listing/Tags/CategorySections/TagImageSection/TagImageContent';
import TagImageSection from '@src/components/Listing/Tags/CategorySections/TagImageSection';

// Types
import { ImageErrorProps, CategorySectionProps } from '@src/components/Listing/Tags/CategorySections/TagImageSection';

type Props = ImageErrorProps & TagImageMethods & TagImageParent;

class CategorySections extends React.Component<Props> {

  protected sections: CategorySectionProps[] = [];
  protected categoryMeta: Catalog<ProductCategoryMeta> = productCategoryCatalog;

  constructor(props: Props) {
    super(props);
    this.buildSections();
  }

  buildSections = () => {
    const availableCategories = this.props.parent.spaces.map(x => x.category).distinct();
    const spacesByCategory = this.props.parent.spaces.clusterBy(x => x.category);
    this.sections = this.categoryMeta.items.pair(availableCategories, x => x.id, x => x).map(x => x.left).map(category => ({
      productCategory: category,
      spaces: spacesByCategory[category.id],
    }));
  }

  render() {
    const { errors, onAdded, onEdit, onRemove, onSorted, parent } = this.props;
    return (
      <React.Fragment>
        {this.sections.map(section => (
          <EagleVisionOrForce
            forced={section.spaces.filter(x => spaceKindCatalog.byId[x.kind].enablePictures).any()}
            key={section.productCategory.id}
          >
            <TagImageSection
              errors={errors}
              onAdded={onAdded}
              onEdit={onEdit}
              onRemove={onRemove}
              onSorted={onSorted}
              parent={parent}
              section={section}
            />
          </EagleVisionOrForce>
        ))}
      </React.Fragment>
    );
  }
}

export default CategorySections;
