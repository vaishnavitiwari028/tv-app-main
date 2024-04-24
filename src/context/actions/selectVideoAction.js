import { SELECT_VIDEO } from "../actionTypes";

const selectVideoAction = (dispatch) => (video) => {
  dispatch({ type: SELECT_VIDEO, payload: video });
};

export default selectVideoAction;
