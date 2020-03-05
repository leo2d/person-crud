import moment from 'moment';

const formatToBRdate = date => {
  return moment(date).format('DD/MM/YYYY');
};

export { formatToBRdate };
