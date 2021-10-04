import { locationConstants } from '../constants/location.constants';
export const locationActions = {
    setLocation,
    resetLocation
};

function setLocation(location, address) {
    return dispatch => {
        try {
            dispatch(set(location));
        } catch (e) {
            console.log(e);
        }
    }
    function set(location) { return { type: locationConstants.SET_LOCATION, location, address } }
}

function resetLocation() {
    return dispatch => {
        try {
            dispatch(reset);
        } catch (e) {
            console.log(e);
        }
    }
    function reset() { return { type: locationConstants.RESET_LOCATION} }
}


