import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { ListingsV1Space } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import InputTicker from '@src/components/Listing/Buttons/InputTicker';
import FormField from '@src/components/Listing/Form/FormField';
import TextInput from '@src/components/Listing/Form/TextInput';
import Editor from '@src/components/Listing/Editor';
import Divider from '@src/components/Listing/Layout/Divider';
import Split from '@src/components/Listing/Layout/Split';
import Headings from '@src/components/Listing/Titles/Headings';
import Section from '@src/components/Listing/Sections/Section';
import SectionContent from '@src/components/Listing/Sections/SectionContent';
import SectionHeader from '@src/components/Listing/Sections/SectionHeader';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

type Props = {
  entry: ListingsV1Space;
};

@observer
class SpaceEditorStock extends Editor<Props, {}, SpaceModel> {

  handleTick = (delta: number) => () => {
    const { entry, entry: { instances }, model } = this.props;
    let newValue = instances + delta;
    if (newValue < 1) {
      newValue = 1;
    }
    model.applyChanges(entry, { instances: newValue });
  }

  render() {
    const { entry, model: { kind, spaceErrors } } = this.props;
    if (!kind || !kind.stock) {
      return null;
    }
    const errors = spaceErrors || {};
    return (
      <React.Fragment>
        <Divider />
        <Section>
          <SectionHeader>
            <Headings tag="h2">
              <Spell word={kind.stock.title} />
            </Headings>
          </SectionHeader>
          <SectionContent>
            <ValidationWrapper errors={errors.instances}>
              <FormField
                error={errors.instances}
                label={<Spell word={kind.stock.label} />}
                required={true}
              >
                <Split variant="s25">
                  <TextInput
                    errors={errors.instances}
                    name="stock"
                    onChange={this.onInputIntChange(entry, 'instances', false)}
                    trailing={
                      <div className={css(styles.textContainer)}>
                        <span className={css(styles.text)}>
                          <Spell
                            count={entry.instances}
                            replacements={{ number: entry.instances }}
                            word={kind.stock.unit}
                          />
                        </span>
                        <InputTicker
                          icon="minus"
                          onClick={this.handleTick(-1)}
                        />
                        <InputTicker
                          icon="plus"
                          onClick={this.handleTick(1)}
                        />
                      </div>
                    }
                    value={entry.instances}
                  />
                </Split>
              </FormField>
            </ValidationWrapper>
          </SectionContent>
        </Section>
      </React.Fragment>
    );
  }
}

export default SpaceEditorStock;
