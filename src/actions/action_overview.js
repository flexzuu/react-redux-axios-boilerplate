import api from './api';
import { FETCH_OVERVIEW } from './const';

export function fetchOverview() {
  return {
    type: FETCH_OVERVIEW,
    payload: api.get('overview'),
  };
}
