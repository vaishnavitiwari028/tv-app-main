import React from "react";
import { useVideosDispatch } from "../../context";
import { selectVideoAction } from "../../context/actions";
import "./style.css";

const VideoItem = ({ thisVideo, channel, isSelected }) => {
  const videoDispatch = useVideosDispatch();
  const onvideoBeingSelected = (e) => {
    selectVideoAction(videoDispatch)(thisVideo);
  };
  return (
    <div
      onClick={() => onvideoBeingSelected(thisVideo)}
      className="video-item-container"
    >
      <div className="thumnail-conatiner">
        <img src={thisVideo.snippet.thumbnails.medium.url} />
      </div>
      <div className="video-footer-container">
        <div className="video-title">{thisVideo.snippet.title}</div>
        <button className="set-channel-button" data-nowPlaying={isSelected}>
          {channel}
        </button>
      </div>
    </div>
  );
};

export default VideoItem;
