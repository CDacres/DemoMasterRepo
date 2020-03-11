import { PeopleBookingRestraints } from './PeopleBookingRestraints';
import { TimeBookingRestraints } from './TimeBookingRestraints';
import { SpendBookingRestraints } from './SpendBookingRestraints';

export type BookingRestraints = {
  duration?: TimeBookingRestraints;
  guests?: PeopleBookingRestraints;
  spend?: SpendBookingRestraints;
};
