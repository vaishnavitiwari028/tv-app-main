import React, { useEffect, useRef } from "react";
import "./style.css";

const Remote = ({ tvRef, children }) => {
  const remoteRef = useRef();
  const firstMoveTask = useRef(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (remoteRef.current) {
        remoteRef.current.style.top = "98%";
        remoteRef.current.style.left = "50%";
        remoteRef.current.style.transform = "translateX(-50%) rotateX(15deg)";
      }
    });
    return () => {
      console.log("remote_unmount");
    };
  }, []);
  const dragRemote = (e) => {
    if (!firstMoveTask.current) {
      remoteRef.current.style.transform = "rotateX(15deg)";
      firstMoveTask.current = true;
    }
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
    const tvPos = tvRef.current.getBoundingClientRect();
    console.log(tvPos.bottom);
    if (
      tvPos.left < e.pageX &&
      tvPos.right > e.pageX &&
      tvPos.top < e.pageY &&
      tvPos.bottom + 35 > e.pageY
    ) {
      let shifty = remoteRef.current.offsetHeight / 2;
      let shiftx = remoteRef.current.offsetWidth / 2;
      remoteRef.current.style.top = e.pageY - tvPos.top - shifty + "px";
      remoteRef.current.style.left = e.pageX - tvPos.left - shiftx + "px";
    }
  };
  const initDrag = () => {
    if (remoteRef.current) {
      document.addEventListener("mousemove", dragRemote);
      document.onmouseup = () => {
        console.log("mouse up");
        document.removeEventListener("mousemove", dragRemote);
        document.onmouseup = null;
      };
    }
  };
  return (
    <div ref={remoteRef} onMouseDown={initDrag} className="remote-container">
      {children}
    </div>
  );
};

export default Remote;
