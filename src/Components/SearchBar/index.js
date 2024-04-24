import { useEffect, useState } from "react";
import wikipedia from "../../apis/wikipedia";
import { useVideosDispatch } from "../../context";
import { getVideosAction, setSearchedTermAction } from "../../context/actions";
import useDebounce from "../../custom-hooks/useDebounce";
import "./style.css";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const videosDispatch = useVideosDispatch();
  const [debouncedTerm] = useDebounce(term);

  useEffect(() => {
    if (!debouncedTerm) {
      setSuggestions([]);
    } else {
      (async () => {
        const { data } = await wikipedia.get("", {
          params: {
            srsearch: debouncedTerm,
          },
        });
        setSuggestions(data.query.search.map((result) => result.title));
      })();
    }
  }, [debouncedTerm]);

  useEffect(() => {
    if (!debouncedTerm && suggestions.length) {
      setSuggestions([]);
    }
  }, [suggestions]);

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    setSearchedTermAction(videosDispatch)(term);
    getVideosAction(videosDispatch)(term);
    setSuggestions([]);
    setTerm("");
  };
  const searchFromSuggetion = (selectedSuggention) => {
    setSuggestions([]);
    setTerm("");
    setSearchedTermAction(videosDispatch)(selectedSuggention);
    getVideosAction(videosDispatch)(selectedSuggention);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={onFormSubmit} className="search-video-form">
        <input
          id="search_term_for_videos"
          className="search-input"
          type="text"
          value={term}
          onChange={onInputChange}
          placeholder="&#128269; search video"
          autoComplete="off"
          autoFocus
        />
      </form>
      <div
        className="suggestions"
        data-suggetions_active={!!suggestions.length}
      >
        {suggestions.length
          ? suggestions.map((suggetion) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  searchFromSuggetion(suggetion);
                }}
              >
                {suggetion}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SearchBar;
