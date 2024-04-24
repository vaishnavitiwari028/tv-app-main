import axios from "axios";
const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: "AIzaSyDDLL6KX95I6MXE98UDegF4NydeBgysXL8" },
});
