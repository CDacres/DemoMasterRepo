/* tslint:disable:max-line-length */
import * as React from 'react';

// Core
import { ListingsV1Space, ProductCategoryMeta } from '@src/core/domain';

// Components
import Divider from '@src/components/Listing/Layout/Divider';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Bulb from '@src/components/Listing/Icons/Bulb';
import IconHint from '@src/components/Listing/IconHint';
import Headings from '@src/components/Listing/Titles/Headings';
import TagImageContent, { TagImageMethods, TagImageParent } from '@src/components/Listing/Tags/CategorySections/TagImageSection/TagImageContent';
import Spell from '@src/components/Listing/Translate/Spell';

// Types
import { ImageErrorProps } from '@src/components/Listing/Tags/CategorySections/TagImageSection/TagImageContent';

export type CategorySectionProps = {
  productCategory: ProductCategoryMeta;
  spaces: ListingsV1Space[];
};

export type ImageErrorProps = ImageErrorProps;

type Props = {
  section: CategorySectionProps;
} & ImageErrorProps & TagImageMethods & TagImageParent;

const TagImageSection = ({ errors, onAdded, onEdit, onRemove, onSorted, parent, section }: Props) => (
  <div>
    <Divider />
    <Section>
      <SectionSplit>
        <SectionHeader
          tooltip={
            <IconHint
              icon={<Bulb />}
              text="listing.dummy_text"
            />
          }
        >
          <Headings tag="h2">
            <Spell word={section.productCategory.description} />
          </Headings>
          <Headings tag="h4">
            <Spell word={section.productCategory.imageSubtitle} />
          </Headings>
        </SectionHeader>
        <SectionContent>
          {section.spaces.any() && section.spaces.map(space => (
            <TagImageContent
              errors={errors.filter(x => x.id === space.id)}
              key={space.id}
              onAdded={onAdded}
              onEdit={onEdit}
              onRemove={onRemove}
              onSorted={onSorted}
              parent={parent}
              space={space}
            />
          ))}
        </SectionContent>
      </SectionSplit>
    </Section>
  </div>
);

export default TagImageSection;
