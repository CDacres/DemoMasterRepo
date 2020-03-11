import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { View } from '@src/core';
import { SpaceGroup } from '@src/core/domain';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import Bulb from '@src/components/Listing/Icons/Bulb';
import IconHint from '@src/components/Listing/IconHint';
import Strip from '@src/components/Listing/Layout/Strip';
import Headings from '@src/components/Listing/Titles/Headings';
import DashedCard from '@src/components/Listing/Layout/Cards/DashedCard';
import SolidCard from '@src/components/Listing/Layout/Cards/SolidCard';
import { VenueSpaceModel } from '@src/components/Listing/Models';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  group: SpaceGroup;
};

@observer
class VenuePackageSection extends View<VenueSpaceModel, Props> {
  render() {
    const { group, model, model: { currency } } = this.props;
    if (!group.productCategory.allowPackages) {
      return null;
    }
    return (
      <SectionContent>
        <Strip
          cols="1fr auto"
          itemsVert="flex-start"
          rowGap="16px"
        >
          <SectionHeader>
            <Headings tag="h3">
              <Spell word={`listing.${group.productCategory.id}_title`} />
            </Headings>
            <Headings tag="h4">
              <Spell word={`listing.${group.productCategory.id}_subtitle`} />
            </Headings>
          </SectionHeader>
          <IconHint
            icon={<Bulb />}
            text="listing.dummy_text"
          />
        </Strip>
        <div>
          <div className={css(styles.packageRow)}>
            <React.Fragment>
              {group.packages.map((item, index) => (
                <div
                  className={css(styles.packageContainer, pagestyles.halfColumn, padding.all_1)}
                  key={index}
                >
                  <SolidCard
                    currency={currency}
                    item={item.name}
                    items={item.includes}
                    onDelete={() => model.packageDelete(item)}
                    onEdit={() => model.packageEdit(item)}
                    price={item.delegatePrice}
                  />
                </div>
              ))}
              <div
                className={css(styles.packageContainer, pagestyles.halfColumn, padding.all_1)}
                onClick={() => model.packageCreate(group.productCategory.id)}
              >
                <DashedCard />
              </div>
            </React.Fragment>
          </div>
        </div>
      </SectionContent>
    );
  }
}

export default VenuePackageSection;
