import moment from 'moment'

import { DATE_FORMAT } from '@/app.constants'

export const getDate = (date, format = DATE_FORMAT) => {
  let newDate = new Date();
  const dateObj = moment(date, format);
  if (date && dateObj.isValid()) {
    const [year, month, day, hours, minutes, seconds] = dateObj.toArray()
    newDate = new Date(year, month, day, hours, minutes, seconds)
  }
  return newDate
};

export const today = (format = DATE_FORMAT) => moment().format(format);

export const getFirstAllowedDay = (bookedDays = [], firstDate = '') => {
  let startDate = moment(firstDate);
  if (!startDate.isValid()) {
    startDate = moment()
  }

  const checkBusy = (date) => bookedDays.indexOf(date.format(DATE_FORMAT)) !== -1;
  let isBusy = checkBusy(startDate);
  while (isBusy) {
    startDate.add(1, 'days');
    isBusy = checkBusy(startDate)
  }
  return startDate
};

export const makeActionList = (items) => {
  return items.map(item => {
    const { id, min, max } = item;
    const name = max ? `${min}-${max}` : `>${min}`;
    return {
      id, name
    }
  })
};

export const carIsBooked = (car, day, booked = []) => {
  return booked.findIndex(item => item.id === car.id && item.date === day) !== -1
};

export default {
  getDate,
  today,
  getFirstAllowedDay,
  makeActionList,
  carIsBooked
}
