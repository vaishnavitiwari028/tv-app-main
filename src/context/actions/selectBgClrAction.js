import { SELECT_BG_CLR } from "../actionTypes";

const selectBgClrAction = (dispatch) => (color) => {
  dispatch({ type: SELECT_BG_CLR, payload: color });
};

export default selectBgClrAction;
