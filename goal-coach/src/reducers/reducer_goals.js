import { SET_GOALS, SET_COMPLETED } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case SET_GOALS:
      const { goals } = action;
      return goals;
    default:
      return state;
  }
}
