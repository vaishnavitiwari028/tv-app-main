import { SELECT_BG_CLR, SELECT_BODY_CLR, SELECT_LOGO } from "../actionTypes";

const customizationReducer = (state, { type, payload }) => {
  switch (type) {
    case SELECT_BG_CLR:
      return { ...state, bgClr: payload };

    case SELECT_BODY_CLR:
      return { ...state, bodyClr: payload };

    case SELECT_LOGO:
      return { ...state, selectedLogo: payload };

    default:
      return state;
  }
};

export default customizationReducer;
