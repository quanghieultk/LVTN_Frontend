import { locationConstants } from '../constants/location.constants';
var initialState={
    location: [],
    address: ''
};
export function location(state = initialState, action) {
  switch (action.type) {
    case locationConstants.SET_LOCATION:
      return { location: [action.location[0], action.location[1]],address: action.address };
    case locationConstants.RESET_LOCATION:
      return { location: null ,address: null };
    default:  
      return state
  }
}