import { SELECT_BODY_CLR } from "../actionTypes";

const selectBodyClrAction = (dispatch) => (color) => {
  document.body.style.setProperty("--body-clr", color);
  dispatch({ type: SELECT_BODY_CLR, payload: color });
};

export default selectBodyClrAction;
