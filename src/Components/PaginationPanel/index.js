import React from "react";
import { useVideosDispatch, useVideosState } from "../../context";
import { getVideosAction, setPageNoAction } from "../../context/actions";
import "./style.css";

const PaginationPanel = () => {
  const {
    videos,
    currentPageNo,
    searchedTerm,
    prevPagesCount,
  } = useVideosState();

  const videosDispatch = useVideosDispatch();

  const setPageNo = (pageNo) => {
    setPageNoAction(videosDispatch)(pageNo);
  };
  return (
    <div className="page-no_container">
      {videos?.length ? (
        <>
          {prevPagesCount || currentPageNo > 1 ? (
            <div className="page-no_decorators">
              <span
                onClick={() => {
                  if (currentPageNo !== 1) setPageNo(currentPageNo - 1);
                  else {
                    (async () => {
                      await getVideosAction(videosDispatch)(
                        searchedTerm,
                        "prev"
                      );
                      await setPageNoAction(videosDispatch)(videos.length);
                    })();
                  }
                }}
              >
                Prev
              </span>{" "}
              ....
            </div>
          ) : null}
          {videos.map((_, i) => (
            <div
              onClick={() => {
                setPageNo(i + 1);
              }}
              className={`page-no${i + 1 === currentPageNo ? " page_now" : ""}`}
            >
              {prevPagesCount * 6 + i + 1}
            </div>
          ))}
          <div className="page-no_decorators">
            ....{" "}
            <span
              onClick={() => {
                if (currentPageNo !== videos.length)
                  setPageNo(currentPageNo + 1);
                else {
                  getVideosAction(videosDispatch)(searchedTerm, "next");
                }
              }}
            >
              Next
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PaginationPanel;
