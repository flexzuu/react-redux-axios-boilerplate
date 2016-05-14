import _ from 'lodash';

export function percent(x, y, precision = 0) {
  const perc = _.round(_.divide(x, y) * 100, precision);
  return `${perc}%`;
}
