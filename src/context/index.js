import React, { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import hexToRGB from "../helpers/hexToRGB";
import { customizationReducer, videosReducer } from "./reducers";

const initialVideos = {
  videos: [],
  selectedVideo: null,
  searchedTerm: null,
  currentPageNo: null,
  isPrevPage: false,
  prevPagesCount: 0,
  // selectedLogo: null,
};

const initialCustomization = {
  bgClr: "#faebd7",
  bodyClr: "#a52a2a",
  selectedLogo: null,
};

const VideosStateContext = createContext();
const VideosDispatchContext = createContext();
const CustomizationStateContext = createContext();
const CustomizationDispatchContext = createContext();

const VideosProvider = ({ children }) => {
  const [videosState, videosDispatch] = useReducer(
    videosReducer,
    initialVideos
  );

  return (
    <VideosStateContext.Provider value={videosState}>
      <VideosDispatchContext.Provider value={videosDispatch}>
        {children}
      </VideosDispatchContext.Provider>
    </VideosStateContext.Provider>
  );
};
export const useVideosState = () => {
  return useContext(VideosStateContext);
};
export const useVideosDispatch = () => {
  return useContext(VideosDispatchContext);
};

export const CustomizationProvider = ({ children }) => {
  const [localData, setLocalData] = useLocalStorage(
    "TUBETV-CUSTOM",
    initialCustomization
  );
  const [customizationState, customizationDispatch] = useReducer(
    customizationReducer,
    localData
  );
  useEffect(() => {
    setLocalData(customizationState);
    document.body.style.setProperty("--bg-clr", customizationState.bgClr);
    document.body.style.setProperty("--body-clr", customizationState.bodyClr);
    document.body.style.setProperty(
      "--sidebar-clr",
      hexToRGB(customizationState.bodyClr, 0.8)
    );
  }, [customizationState]);
  return (
    <CustomizationStateContext.Provider value={customizationState}>
      <CustomizationDispatchContext.Provider value={customizationDispatch}>
        {children}
      </CustomizationDispatchContext.Provider>
    </CustomizationStateContext.Provider>
  );
};

export const useCustomizationState = () => {
  return useContext(CustomizationStateContext);
};
export const useCustomizationDispatch = () => {
  return useContext(CustomizationDispatchContext);
};

export default VideosProvider;
