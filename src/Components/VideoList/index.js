import React from "react";
import { useVideosState } from "../../context";
import PaginationPanel from "../PaginationPanel";
import VideoItem from "../VideoItem";
import "./style.css";

const VideoList = () => {
  const st = useVideosState();
  console.log(st);
  const { videos, selectedVideo, currentPageNo } = useVideosState();

  return (
    <>
      <div className="channel-section-container">
        {videos?.length ? (
          <div
            className="go-to-tv-icon"
            onClick={() => scroll({ top: 0, behavior: "smooth" })}
          >
            &#128250;
          </div>
        ) : null}
        <div id="all-video-channels" className="video-list-container">
          {videos[currentPageNo - 1]?.map((video, index) => (
            <VideoItem
              thisVideo={video}
              channel={index + 1}
              isSelected={video === selectedVideo}
            />
          ))}
        </div>
      </div>
      <PaginationPanel />
    </>
  );
};

export default VideoList;
