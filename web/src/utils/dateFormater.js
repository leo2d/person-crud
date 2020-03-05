import moment from 'moment';

const formatToBRdateFromString = (date: Date | string): string => {
  return moment(date).format('DD/MM/YYYY');
};

export { formatToBRdateFromString };
