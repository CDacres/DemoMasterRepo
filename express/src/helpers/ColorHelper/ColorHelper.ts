/* tslint:disable:max-line-length */

export default class ColorHelper {
  protected MAROON = '#a61d55';
  protected ORANGE = '#ff5a5f';
  protected YELLOW = '#ffb400';
  protected BROWN = '#441a05';
  protected BLACK = '#041618';
  protected RED = '#cf0707';
  protected DARKRED = '#a02f18';
  protected SUCCESS = '#46d633';
  protected WARNING = '#ffc01a';
  protected DANGER = '#f7462b';

  protected verticalColors = {
    1: this.MAROON,
    2: this.ORANGE,
    3: this.YELLOW,
    4: this.YELLOW,
    5: this.YELLOW,
    6: this.YELLOW,
    7: this.YELLOW,
    8: this.YELLOW,
    9: this.YELLOW,
  };

  getVerticalColors() {
    return this.verticalColors;
  }

  getContrastingTextColor(hexColor: string) {
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#484848' : '#ffffff';
  }

  getReservationStatusLabelColour(status: number) {
    const BLOCKED = 0;
    const CREATED = 1;
    const EXPIRED = 2;
    const ACCEPTED = 3;
    const DECLINE = 4;
    const CANCELLEDBYHOST = 5;
    const CANCELLEDBYUSER = 6;
    const CHECKIN = 7;
    const AWAITINGHOSTREVIEW = 8;
    const AWAITINGUSERREVIEW = 9;
    const COMPLETED = 10;
    const DELETED = -1;
    if (status === CREATED) {
      return this.WARNING;
    } else if (status === BLOCKED || status === ACCEPTED || status === CHECKIN || status === AWAITINGHOSTREVIEW || status === AWAITINGUSERREVIEW || status === COMPLETED) {
      return this.SUCCESS;
    } else if (status === EXPIRED || status === DECLINE || status === CANCELLEDBYHOST || status === CANCELLEDBYUSER || status === DELETED) {
      return this.DANGER;
    } else {
      return this.DANGER;
    }
  }

  getInvoiceStatusLabelColour(status: number) {
    const CREATED = 1;
    const PAYMENTDUE = 2;
    const PAID = 3;
    if (status === CREATED) {
      return this.WARNING;
    } else if (status === PAYMENTDUE) {
      return this.DANGER;
    } else if (status === PAID) {
      return this.SUCCESS;
    } else {
      return this.DANGER;
    }
  }

  getPayoutStatusLabelColour(status: number) {
    const CREATED = 1;
    const PAID = 2;
    if (status === CREATED) {
      return this.WARNING;
    } else if (status === PAID) {
      return this.SUCCESS;
    } else {
      return this.DANGER;
    }
  }

  getAssetApprovedLabelColour(status: boolean) {
    const CREATED = false;
    const APPROVED = true;
    if (status === CREATED) {
      return this.WARNING;
    } else if (status === APPROVED) {
      return this.SUCCESS;
    }
  }
}
