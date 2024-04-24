import React, { useState } from "react";
import { useVideosState } from "../../context";
import Sidebar from "../Sidebar";
import UserGuide from "../UserGuide";
import "./style.css";

const Sidebarcontroller = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { searchedTerm } = useVideosState();
  const openSidebar = () => {
    setShowSidebar(true);
  };
  const [showUserGuide, setShowUserGuide] = useState(false);
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <div onClick={openSidebar} className="hamberger_icon">
        &#9776;
      </div>
      {searchedTerm ? null : (
        <header className="hero-container">
          <h1 className="hero-heading">LETS WATCH TV</h1>

          <h5 className="hero-subheading">
            FAMILIAR EXPERIENCE IN AN EXCLUSIVE WAY
          </h5>

          <button className="btn-cta" onClick={openSidebar}>
            Get Started
          </button>
        </header>
      )}
      {showSidebar ? (
        <Sidebar
          closeSidebar={closeSidebar}
          setShowUserGuide={setShowUserGuide}
        />
      ) : null}
      {showUserGuide ? <UserGuide setShowUserGuide={setShowUserGuide} /> : null}
    </>
  );
};

export default Sidebarcontroller;
