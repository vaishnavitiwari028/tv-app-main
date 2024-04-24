import { createPortal } from "react-dom";
import useClickOutside from "../../custom-hooks/useClickOutside";
import "./style.css";
import {tvmonitor} from "../../assets"

const UserGuide = ({ setShowUserGuide }) => {
  const userGuideRef = useClickOutside(() => {
    setShowUserGuide(false);
  });

  return createPortal(
    <div className="modal_container">
      <div className="modal_inner" ref={userGuideRef}>
      <img src={tvmonitor} className="userguide-img1" alt="tv-monitor"/>
        <ul className="userguide_container">
          <li className="userguide_item">
           &#128073; search for videos(youtube) from the menu 
          </li>
          <li className="userguide_item">use remote buttons to start and operate the tv &#128072;</li>
          <li className="userguide_item"> &#128073; drag and position the remote as you wish</li>
          <li className="userguide_item">
           look up each video with respective channel numbers &#9996; 
          </li>
        </ul>
        <button
          onClick={() => {setShowUserGuide(false);}}
          className="userguide_btn"
        >
          OK &#128077;
        </button>
      </div>
    </div>,
    document.getElementById("userguide-modal")
  );
};

export default UserGuide;
