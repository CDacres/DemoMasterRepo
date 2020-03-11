/* tslint:disable:max-line-length */
import { action, computed, observable } from 'mobx';

// Core
import { Catalog, DependentModel } from '@src/core';
import { CommonPlan, DailyHours, dayCollapse, dayEvenSpans, dayIs247, dayIsOpen, dayIsSplit, dayMake247, dayMake9to6, dayMake9to6WithSplit, daySplit, dayToggleOpen, planString, validateHours } from '@src/core/domain';
import { commonPlanCatalog, dayOfWeekCatalog } from '@src/core/meta';

// Models
import { VenueModel } from '@src/components/Listing/Models';

class VenuePlanModel extends DependentModel<VenueModel> {
  commonPlan: Catalog<CommonPlan> = commonPlanCatalog;

  @observable _defaultPlanId?: string = null;
  @observable openingHoursErrors: Array<{ day: DailyHours; span: number; result: string[] }> = null;

  @computed get defaultPlanId() {
    return this._defaultPlanId;
  }

  @computed get allowCustom() {
    if (!this.defaultPlanId) {
      return false;
    }
    const commonPlan = this.commonPlan.byId[this.defaultPlanId];
    return !commonPlan || !commonPlan.openingHours || commonPlan.openingHours.length === 0;
  }

  @observable plan: DailyHours[] = [];

  @action create = async () => {
    await this.setDefaultPlan(this.commonPlan.items.first().id);
  }

  asDailyHoursInput = () => {
    // only open days
    return this.plan.filter(dayIsOpen).map(({ day, spans }) => (
      { day, spans: spans.map(({ start, end }) => ({ start, end })) }
    ));
  }

  validateOpeningHours = () => {
    this.openingHoursErrors = validateHours(this.plan);
  }

  @action setDefaultPlan = async (commonPlanId: string) => {

    this._defaultPlanId = commonPlanId;

    const commonPlan = this.commonPlan.byId[commonPlanId];
    if (!commonPlan || !commonPlan.openingHours) {
      return;
    }

    const days = dayOfWeekCatalog.items.pairLeft(commonPlan.openingHours, x => x.id, x => x.day).map(x => {
      return {
        day: x.key,
        spans: x.right && x.right.spans || [],
      } as DailyHours;
    });
    this.plan = days;
  }

  @action load = async () => {
    const venuePlan = this.parent.venue && this.parent.venue.openingHours || [];
    const plan = dayOfWeekCatalog.items.pairLeft(venuePlan, x => x.id, x => x.day).map(x => x.right || { day: x.key, spans: [] });

    this.plan = plan;

    const hours = JSON.stringify(planString(plan));
    const commonPlan = this.commonPlan.items.first(p => hours === JSON.stringify(planString(p.openingHours)));
    if (!!commonPlan) {
      this._defaultPlanId = commonPlan.id;
    } else {
      this._defaultPlanId = this.commonPlan.items.last().id;
    }
  }

  @action dayEvenSpans = (day: DailyHours) => dayEvenSpans(day);
  @action dayCollapse = (day: DailyHours) => dayCollapse(day);
  @action dayToggleOpen = (day: DailyHours) => dayToggleOpen(day);

  @action dayToggleSplit = (day: DailyHours) => {
    if (dayIsSplit(day)) {
      dayCollapse(day);
    } else {
      daySplit(day);
    }
  }

  @action dayToggle247 = (day: DailyHours) => {
    if (dayIs247(day)) {
      if (dayIsSplit(day)) {
        dayMake9to6WithSplit(day);
      } else {
        dayMake9to6(day);
      }
    } else {
      dayMake247(day);
    }
  }
}

export default VenuePlanModel;
