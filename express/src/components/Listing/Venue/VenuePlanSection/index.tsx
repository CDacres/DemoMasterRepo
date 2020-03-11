/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { View } from '@src/core';

// Styles
import styles from './styles';

// Components
import FormFieldLabel from '@src/components/Listing/Form/FormFieldLabel';
import ListCard from '@src/components/Listing/Layout/Cards/ListCard';
import Headings from '@src/components/Listing/Titles/Headings';
import OpeningHoursEditor from '@src/components/Listing/Venue/VenuePlanSection/OpeningHoursEditor';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionSplit from '@src/components/Listing/Sections/SectionSplit';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenuePlanModel } from '@src/components/Listing/Models';

@observer
class VenuePlanSection extends View<VenuePlanModel> {
  render() {
    const { model, model: { allowCustom, commonPlan, defaultPlanId, plan } } = this.props;
    if (!model) {
      return null;
    }
    return (
      <Section>
        <SectionSplit>
          <Headings tag="h2">
            <Spell word="listing.opening_hours" />
          </Headings>
          <SectionContent>
            <div>
              <FormFieldLabel required={true}>
                <Spell word="listing.opening_hours_title" />
              </FormFieldLabel>
              <div className={css(styles.wrapper)}>
                {commonPlan.items.map((i, k) => (
                  <ListCard
                    isFirst={k === 0}
                    isLast={k === commonPlan.items.length - 1}
                    isSelected={defaultPlanId === i.id}
                    key={k}
                    name="commonPlanId"
                    onClick={() => model.setDefaultPlan(i.id)}
                    stylesArray={{
                      area: [styles.area],
                      container: [styles.container],
                    }}
                    text={i.description}
                  />
                ))}
              </div>
            </div>
            {allowCustom ? (
              <OpeningHoursEditor
                days={plan}
                model={model}
              />
            ) : (
              null
            )}
          </SectionContent>
        </SectionSplit>
      </Section>
    );
  }
}

export default VenuePlanSection;
