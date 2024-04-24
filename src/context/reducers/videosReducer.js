import {
  GET_VIDEOS,
  SELECT_VIDEO,
  SET_PAGE_NUMBER,
  SET_PREV_PAGES_COUNT,
  SET_SEARCHED_TERM,
} from "../actionTypes";

const videosReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_VIDEOS:
      return { ...state, videos: payload, currentPageNo: 1 };

    case SELECT_VIDEO:
      return { ...state, selectedVideo: payload };

    case SET_SEARCHED_TERM:
      return { ...state, searchedTerm: payload };

    case SET_PAGE_NUMBER:
      return { ...state, currentPageNo: payload };

    case SET_PREV_PAGES_COUNT:
      return { ...state, prevPagesCount: state.prevPagesCount + payload };

    default:
      return state;
  }
};

export default videosReducer;
