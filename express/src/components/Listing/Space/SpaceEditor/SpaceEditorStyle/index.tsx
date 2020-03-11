import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { View } from '@src/core';
import { SpaceStyle } from '@src/core/domain';

// Components
import Headings from '@src/components/Listing/Titles/Headings';
import Divider from '@src/components/Listing/Layout/Divider';
import SpaceStyleOption from '@src/components/Listing/Space/SpaceEditor/SpaceEditorStyle/SpaceStyleOption';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { SpaceStyleModel } from '@src/components/Listing/Models';

@observer
class SpaceEditorStyle extends View<SpaceStyleModel> {

  handlePressedStyle = (styleId: SpaceStyle) => () => {
    const { model } = this.props;
    model.setStyle(styleId);
  }

  render() {
    const { model: { style, styleItemsSource, visible } } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <React.Fragment>
        <Divider />
        <Section>
          <SectionHeader>
            <Headings tag="h2">
              <Spell word="listing.space_attributes_heading" />
            </Headings>
          </SectionHeader>
          <SectionSplit>
            <SectionContent>
              {styleItemsSource.map((i, k) => (
                <SpaceStyleOption
                  checked={style === i.id}
                  key={k}
                  onPressed={this.handlePressedStyle(i.id)}
                  style={i}
                />
              ))}
            </SectionContent>
          </SectionSplit>
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorStyle;
