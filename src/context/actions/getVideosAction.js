import youtube from "../../apis/youtube";
import { GET_VIDEOS, SET_PREV_PAGES_COUNT } from "../actionTypes";

let nextPageToken;
let prevPageToken;

const getVideosAction = (dispatch) => async (searchTerm, otherPage) => {
  let response;
  if (otherPage === "next" && nextPageToken) {
    response = await youtube.get("/search", {
      params: {
        part: "snippet",
        maxResults: 48,
        q: searchTerm,
        pageToken: nextPageToken,
      },
    });
    dispatch({ type: SET_PREV_PAGES_COUNT, payload: 1 });
  } else if (otherPage === "prev" && prevPageToken) {
    response = await youtube.get("/search", {
      params: {
        part: "snippet",
        maxResults: 50,
        q: searchTerm,
        pageToken: prevPageToken,
      },
    });
    dispatch({ type: SET_PREV_PAGES_COUNT, payload: -1 });
  } else {
    response = await youtube.get("/search", {
      params: { part: "snippet", maxResults: 48, q: searchTerm },
    });
  }
  const videos = response?.data?.items;
  if (response?.data?.nextPageToken) {
    nextPageToken = response?.data?.nextPageToken;
  }
  if (response?.data?.prevPageToken) {
    prevPageToken = response?.data?.prevPageToken;
  }

  if (Array.isArray(videos)) {
    let i = 1;
    let paginatedVideos = videos.reduce((acc, cur) => {
      if (i === 1) {
        acc.push([]);
      }
      acc[acc.length - 1].push(cur);
      if (i === 9) {
        i = 1;
      } else i++;
      return acc;
    }, []);

    dispatch({ type: GET_VIDEOS, payload: paginatedVideos });
  }
};

export default getVideosAction;
