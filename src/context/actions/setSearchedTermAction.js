import { SET_SEARCHED_TERM } from "../actionTypes";

const setSearchedTermAction = (dispatch) => (searchedTerm) => {
  dispatch({ type: SET_SEARCHED_TERM, payload: searchedTerm });
};

export default setSearchedTermAction;
