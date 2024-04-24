import { SELECT_LOGO } from "../actionTypes";

const selectLogoAction = (dispatch) => (brand) => {
  dispatch({ type: SELECT_LOGO, payload: brand });
};

export default selectLogoAction;
