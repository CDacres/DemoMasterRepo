import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { ConfigurationKind } from '@src/core/domain';
import { sizeUnitCatalog } from '@src/core/meta';

// Styles
import styles from './styles';

// Components
import InputTicker from '@src/components/Listing/Buttons/InputTicker';
import FormField from '@src/components/Listing/Form/FormField';
import NumberInput from '@src/components/Listing/Form/NumberInput';
import SelectInput from '@src/components/Listing/Form/SelectInput';
import TextInput from '@src/components/Listing/Form/TextInput';
import SelectOption from '@src/components/Listing/Form/SelectInput/SelectOption';
import Editor from '@src/components/Listing/Editor';
import Divider from '@src/components/Listing/Layout/Divider';
import Split from '@src/components/Listing/Layout/Split';
import Headings from '@src/components/Listing/Titles/Headings';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';
import SpellRender from '@src/components/Listing/Translate/SpellRender';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

@observer
class SpaceEditorSize extends Editor<{}, {}, SpaceModel> {

  handleTick = (delta: number) => () => {
    const { model, model: { capacityBloc } } = this.props;
    let officeMaxPax = (capacityBloc.officeMaxPax || 0) + delta;
    if (officeMaxPax < 1) {
      officeMaxPax = 1;
    }
    model.applyChanges(capacityBloc, { officeMaxPax });
  }

  render() {
    const { model: { capacityBloc, capacityBloc: { areaErrors, capacityErrors }, kind } } = this.props;
    if (!kind || !kind.size) {
      return null;
    }

    let configErrors: {
      maxPax?: string[];
    };
    if (capacityErrors !== null) {
      const errorList = capacityErrors.filter(e => e.config.kind === ConfigurationKind.SEATED);
      if (errorList.length) {
        configErrors = errorList.first().result;
      }
    }

    const maxPaxError = configErrors && configErrors.maxPax || [];
    const areaError = areaErrors || {};

    return (
      <React.Fragment>
        <Divider />
        <Section>
          <SectionHeader>
            <Headings tag="h2">
              <Spell word={kind.size.title} />
            </Headings>
          </SectionHeader>
          <Split variant="s25">
            <SectionContent>
              {!!kind.size.area ? (
                <ValidationWrapper errors={areaError.value}>
                  <FormField
                    error={areaError.value}
                    label={<Spell word={kind.size.area.label} />}
                    required={true}
                  >
                    <Split
                      right={
                        <SelectInput
                          name="size_unit"
                          onChange={this.onInputChange(capacityBloc, 'floorSizeUnit')}
                          value={capacityBloc.floorSizeUnit}
                        >
                          {sizeUnitCatalog.items.map((i, k) => (
                            <SpellRender
                              key={k}
                              render={(t) => <SelectOption value={i.id}>{t.get(i.description)}</SelectOption>}
                            />
                          ))}
                        </SelectInput>
                      }
                      variant="s50"
                    >
                      <NumberInput
                        errors={areaError.value}
                        name="size"
                        onValueChange={this.onNumberFloatChange(capacityBloc, 'floorSize')}
                        placeholder="0"
                        value={capacityBloc.floorSize}
                      />
                    </Split>
                  </FormField>
                </ValidationWrapper>
              ) : (
                null
              )}
              {!!kind.size.capacity ? (
                <ValidationWrapper errors={maxPaxError}>
                  <FormField
                    error={maxPaxError}
                    label={<Spell word={kind.size.capacity.label} />}
                    required={true}
                  >
                    <TextInput
                      errors={maxPaxError}
                      name="capacity"
                      onChange={this.onInputIntChange(capacityBloc, 'officeMaxPax', false)}
                      placeholder="0"
                      trailing={
                        <div className={css(styles.textContainer)}>
                          <span className={css(styles.text)}>
                            <Spell
                              count={capacityBloc.officeMaxPax}
                              replacements={{ number: capacityBloc.officeMaxPax }}
                              word={kind.size.capacity.unit}
                            />
                          </span>
                          <InputTicker
                            icon="minus"
                            onClick={this.handleTick(-1)}
                          />
                          <InputTicker
                            icon="plus"
                            onClick={this.handleTick(+1)}
                          />
                        </div>
                      }
                      value={capacityBloc.officeMaxPax}
                    />
                  </FormField>
                </ValidationWrapper>
              ) : (
                null
              )}
            </SectionContent>
          </Split>
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorSize;
