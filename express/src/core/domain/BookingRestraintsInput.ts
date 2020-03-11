import { PeopleBookingRestraintsInput } from './PeopleBookingRestraintsInput';
import { TimeBookingRestraintsInput } from './TimeBookingRestraintsInput';
import { SpendBookingRestraintsInput } from './SpendBookingRestraintsInput';

export type BookingRestraintsInput = {
  duration?: TimeBookingRestraintsInput;
  guests?: PeopleBookingRestraintsInput;
  spend?: SpendBookingRestraintsInput;
};
