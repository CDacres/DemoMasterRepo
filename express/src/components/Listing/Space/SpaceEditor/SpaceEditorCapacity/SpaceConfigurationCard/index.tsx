/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { SpaceConfiguration } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import InputTicker from '@src/components/Listing/Buttons/InputTicker';
import CheckboxInput from '@src/components/Listing/Form/CheckboxInput';
import FormControlLabel from '@src/components/Listing/Form/FormControlLabel';
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import QuestionPop from '@src/components/Listing/Form/QuestionPop';
import TextInput from '@src/components/Listing/Form/TextInput';
import Editor from '@src/components/Listing/Editor';
import Split from '@src/components/Listing/Layout/Split';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpaceCapacityModel } from '@src/components/Listing/Models';

type Props = {
  spaceConfiguration: SpaceConfiguration;
};

@observer
class SpaceConfigurationCard extends Editor<Props, {}, SpaceCapacityModel> {

  handleTick = (amount: number) => () => {
    const { model, spaceConfiguration } = this.props;
    let maxPax = spaceConfiguration.maxPax + amount;
    if (maxPax < 1) {
      maxPax = 1;
    }
    model.applyChanges(spaceConfiguration, { maxPax });
  }

  render() {
    const { model: { capacityErrors, configurationKindMeta }, spaceConfiguration, spaceConfiguration: { kind, isActive, maxPax } } = this.props;
    const configType = configurationKindMeta.byId[kind];

    let configErrors: {
      maxPax?: string[];
    };
    if (capacityErrors !== null) {
      const errorList = capacityErrors.filter(e => e.config.kind === kind && e.config.maxPax === maxPax);
      if (errorList.length) {
        configErrors = errorList.first().result;
      }
    }

    const maxPaxError = configErrors && configErrors.maxPax || [];

    return (
      <Split
        style={{
          marginBottom: '16px',
          minHeight: '46px',
        }}
        variant="s50x"
      >
        <div>
          <FormControlLabel
            control={
              <CheckboxInput
                checked={isActive}
                name="configuration"
                onChange={this.onInputCheckChange(spaceConfiguration, 'isActive')}
              />
            }
            label={
              <span className={css(styles.label)}>
                <Spell word={configType.description} />
              </span>
            }
            noMarginRight={true}
          />
          {configType.thumbUrl &&
            <QuestionPop
              content={
                <img
                  alt={configType.thumbUrl}
                  src={configType.thumbUrl}
                />
              }
            />
          }
        </div>
        {isActive ? (
          <ValidationWrapper errors={maxPaxError}>
            <TextInput
              errors={maxPaxError}
              name="guests"
              onChange={this.onInputIntChange(spaceConfiguration, 'maxPax', false)}
              trailing={
                <div className={css(styles.textContainer)}>
                  <span className={css(styles.text)}>
                    <Spell
                      count={maxPax}
                      replacements={{ number: maxPax }}
                      word="listing.guests_count"
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
              value={maxPax}
            />
            <FormFieldError errors={maxPaxError} />
          </ValidationWrapper>
        ) : (
          null
        )}
      </Split>
    );
  }
}

export default SpaceConfigurationCard;
