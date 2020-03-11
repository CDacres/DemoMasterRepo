/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { EntryEdit } from '@src/core';
import { ListingsV1Space } from '@src/core/domain';

// Components
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import FormFieldLabel from '@src/components/Listing/Form/FormFieldLabel';
import FormFieldSublabel from '@src/components/Listing/Form/FormFieldSublabel';
// import Button from '@src/components/Listing/Buttons/Button';
import Headings from '@src/components/Listing/Titles/Headings';
import Divider from '@src/components/Listing/Layout/Divider';
import Expanded from '@src/components/Listing/Layout/Expanded';
import Split from '@src/components/Listing/Layout/Split';
import ProductCategoryInput from '@src/components/Listing/Space/SpaceEditor/SpaceEditorKind/ProductCategoryInput';
import SpaceTypeInput from '@src/components/Listing/Space/SpaceEditor/SpaceEditorKind/SpaceTypeInput';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

@observer
class SpaceEditorKind extends EntryEdit<ListingsV1Space, SpaceModel> {
  render() {
    const { entry, model, model: { availableSpaceTypes, category, isTypeExpanded, kind, possibleSpaceTypes, productCategoryMeta, spaceErrors } } = this.props;
    const errors = spaceErrors || {};
    return (
      <React.Fragment>
        <Divider />
        <Section>
          <SectionHeader>
            <Headings tag="h2">
              <Spell word="listing.space_info" />
            </Headings>
          </SectionHeader>
          <SectionContent>
            <div>
              <FormFieldLabel>
                <Spell word="listing.space_category" />
              </FormFieldLabel>
              <Expanded
                collapsed={!isTypeExpanded &&
                  <FormFieldSublabel>
                    <Spell word={category.description} />
                  </FormFieldSublabel>
                }
                open={isTypeExpanded}
              >
                <ProductCategoryInput
                  itemsSource={productCategoryMeta.items}
                  onChange={(v) => model.setProductCategory(entry, v)}
                  value={entry.category}
                />
              </Expanded>
              <ValidationWrapper errors={errors.category}>
                <FormFieldError errors={errors.category} />
              </ValidationWrapper>
            </div>
            {possibleSpaceTypes.length > 1 ? (
              <Split variant="s66">
                <div>
                  <FormFieldLabel>
                    <Spell word="common.type" />
                  </FormFieldLabel>
                  {availableSpaceTypes.length > 1 &&
                    <React.Fragment>
                      <Expanded
                        collapsed={(!isTypeExpanded || availableSpaceTypes.length === 1) &&
                          <FormFieldSublabel>
                            <Spell word={kind.description} />
                          </FormFieldSublabel>
                        }
                        open={isTypeExpanded}
                      >
                        <SpaceTypeInput
                          itemsSource={availableSpaceTypes}
                          onChange={this.applyChange('kind')}
                          value={entry.kind}
                        />
                      </Expanded>
                      <ValidationWrapper errors={errors.kind}>
                        <FormFieldError errors={errors.kind} />
                      </ValidationWrapper>
                    </React.Fragment>
                  }
                </div>
              </Split>
            ) : (
              null
            )}
            {/* {!isTypeExpanded &&
              <div>
                <Button
                  color="primary"
                  hasBoldText={true}
                  hasLargePadding={true}
                  onClick={() => model.applyChanges(model, { isTypeExpanded: !isTypeExpanded })}
                  variant="outlined"
                >
                  <Spell
                    variant="inherit"
                    word="common.edit"
                  />
                </Button>
              </div>
            } */}
          </SectionContent>
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorKind;
