import moment from 'moment';

export default function formatDate(dateStr: string) {
  return moment(dateStr, 'YYYY-MM-DD hh:mm:ss').calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'MMMM YYYY',
  });
}
