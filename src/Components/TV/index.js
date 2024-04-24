import React, { useEffect, useRef, useState } from "react";
import {
  useCustomizationState,
  useVideosDispatch,
  useVideosState,
} from "../../context";
import { selectVideoAction } from "../../context/actions";
import useYoutubeScript from "../../custom-hooks/useYoutubeScript";
import Remote from "../Remote";
import "./style.css";

const TV = () => {
  const { videos, selectedVideo, currentPageNo } = useVideosState();
  const { selectedLogo } = useCustomizationState();
  const videosDispatch = useVideosDispatch();
  const tvRef = useRef();

  const selectedVideoId = selectedVideo?.id?.videoId;
  const player= useYoutubeScript({
    iframeId: "youtubeplayer",
    videoId: selectedVideoId,
  });

  const [isTvOff, setIsTvOff] = useState(true);
  const [tvInfo, setTvInfo] = useState();

  useEffect(() => {
    if (player) {
      const onStateChange = () => {
        if (player) {
          console.log(player.getPlayerState());
          if (player.getPlayerState() === 2 || player.getPlayerState() === -1) {
            if (!isTvOff) {
              setIsTvOff(true);
            }
          } else {
            setTimeout(() => {
              setIsTvOff(false);
              tvRef.current.style.setProperty(
                "--tv_light_color",
                "greenyellow"
              );
            }, 1000);
          }
        }
      };
      player.addEventListener("onStateChange", onStateChange);
    }
  }, [player]);

  useEffect(() => {
    if (!isTvOff) {
      if (selectedVideoId) {
        tvRef.current.style.setProperty("--tv_light_color", "greenyellow");
        changeTvInfo(
          videos[currentPageNo - 1].findIndex(
            (video) => video.id.videoId === selectedVideoId
          ) + 1
        );
      } else tvRef.current.style.setProperty("--tv_light_color", "red");
    }
  }, [selectedVideoId]);

  const changeTvInfo = (info) => {
    setTvInfo(info);
    let timer = setTimeout(() => {
      setTvInfo("");
      clearTimeout(timer);
    }, 6000);
  };
  const tvOnOff = () => {
    if (!player && isTvOff && !selectedVideoId) {
      selectVideoAction(videosDispatch)(videos[currentPageNo - 1][0]);
      tvRef.current.style.setProperty("--tv_light_color", "greenyellow");
      setTimeout(() => {
        setIsTvOff(false);
      }, 1000);
      changeTvInfo(1);
      return;
    } else if (isTvOff && player.getPlayerState() === 2) {
      tvRef.current.style.setProperty("--tv_light_color", "greenyellow");
      player.playVideo();
      setTimeout(() => {
        setIsTvOff(false);
      }, 1000);
    } else {
      tvRef.current.style.setProperty("--tv_light_color", "red");
      player.pauseVideo();
      changeTvInfo(videos.indexOf(selectedVideo) + 1);
      setIsTvOff(true);
    }
  };

  const selectChannel = (video) => {
    if (isTvOff) return;
    selectVideoAction(videosDispatch)(video);
  };

  const volUp = () => {
    if (isTvOff) return;
    player.setVolume(player.getVolume() + 5);
    changeTvInfo({ vol: player.getVolume() / 5 });
  };

  const volDown = () => {
    if (isTvOff) return;
    console.log(player.getVolume());
    player.setVolume(player.getVolume() - 5);
    changeTvInfo({ vol: player.getVolume() / 5 });
  };

  const volMute = () => {
    if (isTvOff) return;
    if (player.isMuted()) {
      player.unMute();
      changeTvInfo("UNMUTE");
    } else {
      player.mute();
      changeTvInfo("MUTE");
    }
  };
  const channelUp = () => {
    if (isTvOff) return;
    let current = videos[currentPageNo - 1].findIndex(
      (video) => video.id.videoId === selectedVideoId
    );
    if (current === videos[currentPageNo - 1].length - 1) {
      selectVideoAction(videosDispatch)(videos[currentPageNo - 1][0]);
      changeTvInfo(1);
    } else {
      selectVideoAction(videosDispatch)(videos[currentPageNo - 1][current + 1]);
      changeTvInfo(current + 2);
    }
  };

  const ChannelDown = () => {
    if (isTvOff) return;
    let current = videos[currentPageNo - 1].findIndex(
      (video) => video.id.videoId === selectedVideoId
    );
    if (current === 0) {
      selectVideoAction(videosDispatch)(
        videos[currentPageNo - 1][videos.length - 1]
      );
      changeTvInfo(videos[currentPageNo - 1].length);
    } else {
      selectVideoAction(videosDispatch)(videos[currentPageNo - 1][current - 1]);
      changeTvInfo(current);
    }
  };

  return (
    <div ref={tvRef} className="tv-container">
      <div id="youtubeplayer"></div>
      {isTvOff ? <div className="tv-overlay"></div> : null}
      {typeof tvInfo === "object" ? (
        <div className="volume-bars-container">
          {Array(+tvInfo.vol)
            .fill()
            .map((_) => (
              <div className="volume-bar"></div>
            ))}
        </div>
      ) : tvInfo === "UNMUTE" ? (
        <div className="channel-info">&#128266;</div>
      ) : tvInfo === "MUTE" ? (
        <div className="channel-info">&#128263;</div>
      ) : tvInfo ? (
        <div className="channel-info">{tvInfo}</div>
      ) : null}
      <div className="tv-light"></div>
      {selectedLogo ? (
        <img
          src={selectedLogo.logo}
          className={`tv_company_logo${
            selectedLogo.name === "LG" ? " clipped" : ""
          }`}
        />
      ) : null}
      <div className="tv-deck">

      </div>
      {videos?.length ? (
        <Remote tvRef={tvRef}>
          <button title="on/off" onClick={tvOnOff}>
            &#9678;
          </button>
          <div></div>
          <button
            title="Full screen"
            onClick={() => player.getIframe().requestFullscreen()}
          >
            &#xe5d0;
          </button>
          {videos[currentPageNo - 1]?.map((video, index) => (
            <button onClick={() => selectChannel(video, index + 1)}>
              {index + 1}
            </button>
          ))}
          <button title="Volume up" onClick={volUp}>
            +
          </button>
          <button title="Channel up" onClick={channelUp}>
            &#8743;
          </button>
          <button title="Sound Mute/Unmute" onClick={volMute}>
            &#162;
          </button>
          <button title="Volume down" onClick={volDown}>
            -
          </button>
          <button title="Channel down" onClick={ChannelDown}>
            &#8744;
          </button>
        </Remote>
      ) : null}
    </div>
  );
};
export default TV;
