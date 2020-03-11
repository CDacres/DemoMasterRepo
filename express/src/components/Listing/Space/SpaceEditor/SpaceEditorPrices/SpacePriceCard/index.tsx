/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { planString, PriceCoverage, ProductPrice, resolvePriceModelExperimental, TimeUnit } from '@src/core/domain';
import { specs } from '@src/core/ux';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import Column from '@src/components/Listing/Layout/Column';
import Divider from '@src/components/Listing/Layout/Divider';
import Expanded from '@src/components/Listing/Layout/Expanded';
import Row from '@src/components/Listing/Layout/Row';
import ScrollX from '@src/components/Listing/Layout/ScrollX';
import Split from '@src/components/Listing/Layout/Split';
import Strip from '@src/components/Listing/Layout/Strip';
import Currency from '@src/components/Listing/Form/Currency';
import FormField from '@src/components/Listing/Form/FormField';
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import NumberInput from '@src/components/Listing/Form/NumberInput';
import SelectInput from '@src/components/Listing/Form/SelectInput';
import SwitchInput from '@src/components/Listing/Form/SwitchInput';
import TrailIncludeVAT from '@src/components/Listing/Form/TrailIncludeVAT';
import Editor from '@src/components/Listing/Editor';
import DurationText from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard/DurationText';
import OpeningHoursEditor from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard/OpeningHoursEditor';
import ProductName from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard/ProductName';
import HourOptions from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard/SelectOptions/HourOptions';
import MaximumDurationOption from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard/SelectOptions/MaximumDurationOption';
import MinimumDurationOption from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard/SelectOptions/MinimumDurationOption';
import MonthOptions from '@src/components/Listing/Space/SpaceEditor/SpaceEditorPrices/SpacePriceCard/SelectOptions/MonthOptions';
import Spell from '@src/components/Listing/Translate/Spell';
import PlanTitle from '@src/components/Listing/OpeningHours/PlanTitle';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { SpacePriceModel } from '@src/components/Listing/Models';

const data = { tip: '' };

type Props = {
  price: ProductPrice;
};

type State = {
  expanded: boolean;
};

@observer
class SpacePriceCard extends Editor<Props, State, SpacePriceModel> {
  state: State = { expanded: false };

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  handleDelete = () => {
    const { model, price } = this.props;
    model.priceDelete(price);
  }

  render() {
    const { model, model: { currency, priceErrors, priceModelMeta, termMeta }, price } = this.props;
    const { expanded } = this.state;

    const allowPlan = priceModelMeta.byId[price.model].allowPricingSchedule;
    const hasPlan = allowPlan && !!price.schedule;
    const openingHours = hasPlan ? planString(price.schedule.days) : null;

    const priceModel = resolvePriceModelExperimental(price);

    const maxDuration = price.maxDuration ? price.maxDuration : 0;
    const minDuration = price.minDuration ? price.minDuration : 0;

    const allowPriceDelete = model.allowDelete(price);

    const hasAdvanced = ((priceModel === TimeUnit.HOUR) || (priceModel === TimeUnit.MONTH) || (priceModel === PriceCoverage.MINIMUMSPEND) || hasPlan || allowPlan);

    let cardErrors: {
      minDuration?: string[];
      minSpendAmount?: string[];
      unitPrice?: string[];
    };
    if (priceErrors !== null) {
      const errorList = priceErrors.filter(e => e.price === price);
      if (errorList.length) {
        cardErrors = errorList.first().result;
      }
    }

    const minMaxDurationError = cardErrors && cardErrors.minDuration || [];
    const minSpendAmountError = cardErrors && cardErrors.minSpendAmount || [];
    const unitPriceAmountError = cardErrors && cardErrors.unitPrice || [];

    return (
      <Column
        style={{
          padding: '0px 16px',
          borderRadius: specs.borderRadius,
          border: specs.boxBorder,
        }}
      >
        <Split variant="s75l">
          <div className={css(margin.top_3)}>
            <div className={css(margin.top_0_25, margin.bottom_0_75)}>
              <div>
                <span>
                  <span className={css(styles.name)}>
                    <ProductName price={price} />
                  </span>
                  {hasPlan ? (
                    <React.Fragment>
                      <span className={css(styles.separator)}>
                        {' | '}
                      </span>
                      <span className={css(styles.openingHours)}>
                        {openingHours &&
                          <PlanTitle
                            limit={1}
                            openingHours={openingHours}
                          />
                        }
                      </span>
                    </React.Fragment>
                  ) : (
                    null
                  )}
                </span>
              </div>
            </div>
            <div className={css(margin.top_0_25, margin.bottom_0_75)}>
              <span className={css(styles.duration)}>
                <DurationText
                  maxDuration={maxDuration}
                  minDuration={minDuration}
                  priceModel={priceModel}
                  unit={price.unit}
                />
              </span>
            </div>
            {!!data.tip ? (
              <div className={css(margin.top_0_25, margin.bottom_0_75)}>
                <span className={css(styles.tip)}>
                  {data.tip}
                </span>
              </div>
            ) : (
              null
            )}
          </div>
          <div className={css(styles.priceContainer, margin.top_3)}>
            <label>
              {priceModel === PriceCoverage.MINIMUMSPEND ? (
                <ValidationWrapper errors={minSpendAmountError}>
                  <NumberInput
                    errors={minSpendAmountError}
                    leading={<Currency currency={currency} />}
                    name="min_spend"
                    onValueChange={this.onNumberFloatChange(price, 'minSpendAmount')}
                    placeholder="0"
                    trailing={<TrailIncludeVAT />}
                    value={price.minSpendAmount}
                  />
                  <FormFieldError errors={minSpendAmountError} />
                </ValidationWrapper>
              ) : (
                <ValidationWrapper errors={unitPriceAmountError}>
                  <NumberInput
                    errors={unitPriceAmountError}
                    leading={<Currency currency={currency} />}
                    name="price"
                    onValueChange={this.onNumberFloatChange(price.unitPrice, 'value')}
                    placeholder="0"
                    trailing={<TrailIncludeVAT />}
                    value={price.unitPrice && price.unitPrice.value}
                  />
                  <FormFieldError errors={unitPriceAmountError} />
                </ValidationWrapper>
              )}
            </label>
          </div>
        </Split>
        <Column style={{ marginTop: '24px' }}>
          {(hasAdvanced || allowPriceDelete) &&
            <React.Fragment>
              <Divider />
              <Expanded open={expanded}>
                <Column
                  gap="12px"
                  style={{ marginTop: '24px' }}
                >
                  {priceModel === TimeUnit.HOUR ? (
                    <React.Fragment>
                      <FormField label={<Spell word="common.minimum_duration" />}>
                        <SelectInput
                          name="min_duration"
                          onChange={this.onInputIntChange(price, 'minDuration')}
                          value={minDuration}
                        >
                          <MinimumDurationOption />
                          <HourOptions />
                        </SelectInput>
                      </FormField>
                    </React.Fragment>
                  ) : (priceModel === TimeUnit.MONTH ? (
                    <Split variant="s50">
                      <div className={css(styles.monthMin)}>
                        <ValidationWrapper errors={minMaxDurationError}>
                          <FormField label={<Spell word="listing.minimum_term" />}>
                            <SelectInput
                              errors={minMaxDurationError}
                              name="min_term"
                              onChange={this.onInputIntChange(price, 'minDuration')}
                              value={minDuration}
                            >
                              <MinimumDurationOption />
                              {maxDuration > 0 ? (
                                <React.Fragment>
                                  {termMeta.items.filter(x => x.months <= maxDuration).map((i, k) => (
                                    <MonthOptions
                                      item={i}
                                      key={k}
                                    />
                                  ))}
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  {termMeta.items.map((i, k) => (
                                    <MonthOptions
                                      item={i}
                                      key={k}
                                    />
                                  ))}
                                </React.Fragment>
                              )}
                            </SelectInput>
                          </FormField>
                          <FormField label={<Spell word="listing.maximum_term" />}>
                            <SelectInput
                              errors={minMaxDurationError}
                              name="max_term"
                              onChange={this.onInputIntChange(price, 'maxDuration')}
                              value={maxDuration}
                            >
                              <MaximumDurationOption />
                              {termMeta.items.filter(x => x.months >= (minDuration || 0)).map((i, k) => (
                                <MonthOptions
                                  item={i}
                                  key={k}
                                />
                              ))}
                            </SelectInput>
                          </FormField>
                          <FormFieldError errors={minMaxDurationError} />
                        </ValidationWrapper>
                      </div>
                    </Split>
                  ) : (priceModel === PriceCoverage.MINIMUMSPEND ? (
                    <Split variant="s50">
                      <div className={css(styles.monthMin)}>
                        <FormField label={<Spell word="common.maximum_duration" />}>
                          <SelectInput
                            name="max_duration"
                            onChange={this.onInputIntChange(price, 'maxDuration')}
                            value={maxDuration}
                          >
                            <MaximumDurationOption />
                            <HourOptions />
                          </SelectInput>
                        </FormField>
                      </div>
                    </Split>
                  ) : (
                    null
                  )))}
                  {expanded &&
                    <React.Fragment>
                      {allowPlan ? (
                        <Strip cols="1fr auto">
                          <Spell
                            variant="card"
                            word="listing.pricing_schedule"
                          />
                          <SwitchInput
                            checked={hasPlan}
                            name="schedule"
                            onChange={(_, c) => model.priceScheduleToggle(price, c)}
                          />
                        </Strip>
                      ) : (
                        null
                      )}
                      {hasPlan ? (
                        <ScrollX
                          containerStyle={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '5px',
                            padding: '5px 10px',
                          }}
                        >
                          <OpeningHoursEditor
                            days={price.schedule.days}
                            model={model}
                          />
                        </ScrollX>
                      ) : (
                        null
                      )}
                    </React.Fragment>
                  }
                </Column>
              </Expanded>
            </React.Fragment>
          }
        </Column>
        {(hasAdvanced || allowPriceDelete) &&
          <Row
            crossAlignment="center"
            gap="8px"
            style={{
              justifyContent: 'flex-start',
              padding: '16px 0px',
            }}
          >
            {hasAdvanced &&
              <div onClick={this.toggleExpand}>
                <Row>
                  <span className={css(styles.footerText, styles.footerTextPrimary)}>
                    <Spell word={expanded ? 'common.hide' : 'common.advanced'} />
                  </span>
                </Row>
              </div>
            }
            {allowPriceDelete &&
              <div onClick={this.handleDelete}>
                <Row>
                  <span className={css(styles.footerText, styles.footerTextError)}>
                    <Spell word="common.delete" />
                  </span>
                </Row>
              </div>
            }
          </Row>
        }
      </Column>
    );
  }
}

export default SpacePriceCard;
