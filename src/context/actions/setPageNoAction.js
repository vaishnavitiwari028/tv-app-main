import { SET_PAGE_NUMBER } from "../actionTypes";

const setPageNoAction = (dispatch) => (pageNo) => {
  dispatch({ type: SET_PAGE_NUMBER, payload: pageNo });
};

export default setPageNoAction;
