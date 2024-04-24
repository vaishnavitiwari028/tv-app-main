import React from "react";
import { lg, panasonic, samsung, sony } from "../../assets";
import {
  useCustomizationDispatch,
  useCustomizationState,
  useVideosDispatch,
  useVideosState,
} from "../../context";
import {
  selectBgClrAction,
  selectBodyClrAction,
  selectLogoAction,
} from "../../context/actions";
import useClickOutside from "../../custom-hooks/useClickOutside";
import SearchBar from "../SearchBar";
import "./style.css";

const BRANDS = [
  { name: "SONY", logo: sony },
  { name: "SAMSUNG", logo: samsung },
  { name: "LG", logo: lg },
  { name: "PANASONIC", logo: panasonic },
];
const Sidebar = ({ closeSidebar, setShowUserGuide }) => {
  const { bgClr, bodyClr } = useCustomizationState();
  const customizationDispatch = useCustomizationDispatch();
  const { searchedTerm } = useVideosState();
  const videosDispatch = useVideosDispatch();
  const sidebarRef = useClickOutside(closeSidebar);

  return (
    <div ref={sidebarRef} className="sidebar_container">
      <div onClick={closeSidebar} className="close_icon">
        &#9746;
      </div>
      {searchedTerm ? (
        <div
          className={`nav_item_container${searchedTerm ? " channel_link" : ""}`}
          onClick={() => {
            if (searchedTerm) {
              scrollTo({
                top: document
                  .getElementById("all-video-channels")
                  .getBoundingClientRect().top,
                behavior: "smooth",
              });
            }
          }}
        >
          <a className="nav_item">Channels for "{searchedTerm}"</a>
        </div>
      ) : null}
      <SearchBar />

      <nav>
        <div className="nav_item_container">
          <label className="nav_item" htmlFor="choose_clr1">
            Change Wall Color
          </label>
          <input
            onChange={(e) => {
              selectBgClrAction(customizationDispatch)(e.target.value);
            }}
            value={bgClr}
            id="choose_clr1"
            type="color"
          />
        </div>
        <div className="nav_item_container">
          <label className="nav_item" htmlFor="choose_clr2">
            Change Desk Color
          </label>
          <input
            onChange={(e) => {
              selectBodyClrAction(customizationDispatch)(e.target.value);
            }}
            value={bodyClr}
            id="choose_clr2"
            type="color"
          />
        </div>
        <div className="nav_item_container">
          <div className="nav_item select_company">Select Company</div>
          <div className="subbar_container">
            <nav>
              {BRANDS.map((brand) => (
                <li
                  className="subbar_item"
                  onClick={() => {
                    selectLogoAction(customizationDispatch)(brand);
                  }}
                >
                  {brand.name}
                </li>
              ))}
            </nav>
          </div>
        </div>
        <div
          className="nav_item_container"
          onClick={() => {
            setShowUserGuide(true);
            closeSidebar();
          }}
        >
          <div className="nav_item">User Guide</div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
