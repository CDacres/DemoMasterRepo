import moment from 'moment';

export default (endTime: string, type?: string): string[] => {

  const beginOfDay = 9;
  const lastPossibleTime = +endTime.split(':')[0];
  const times = [];
  if (type && type === 'halfDay') {
    const halfDayLength = Math.floor((lastPossibleTime - beginOfDay) / 2);
    const startOfDay = moment().set({
      'hour': beginOfDay,
      'minute': 0,
    });
    const middleOfDay = startOfDay.clone().add(halfDayLength, 'hours');
    times[0] = `${startOfDay.format('HH:mm')} - ${middleOfDay.format('HH:mm')}`;
    times[1] = `${middleOfDay.format('HH:mm')} - ${middleOfDay.add(halfDayLength, 'hours').format('HH:mm')}`;
    return times;
  }
  const length = (lastPossibleTime - beginOfDay) * 2;
  let startTime = moment().set({
    'hour': beginOfDay,
    'minute': 0,
  });
  for (let i = 0; i < length; i++) {
    if (type && type === 'doubleTime') {
      times.push(`${startTime.format('HH:mm')} - ${startTime.add(30, 'minutes').format('HH:mm')}`);
    } else {
      times.push(startTime.format('HH:mm'));
      startTime = startTime.add(30, 'minutes');
    }
  }
  return times;
};
