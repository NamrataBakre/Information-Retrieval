import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useDebounce from "./use-debounce";
import "./styles.css";

function SearchBar() {
  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          // Filter out results with no thumbnail
          const filteredResults = results.data.results.filter(
            (result) =>
              result.thumbnail.path.indexOf("image_not_available") === -1
          );
          setResults(filteredResults);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div style={{ padding: "15px" }}>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search Tweets here.."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button button4">Search</button>
        </div>
      </div>

      {isSearching && <div>Searching ...</div>}

      {results.map((result) => (
        <div
          key={result.id}
          style={{
            display: "inline-block",
            width: "200px",
            margin: "100px"
          }}
        >
          <h4>{result.title}</h4>
          <img
            src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}

function searchCharacters(search) {
  const apiKey = "5bd31f7200ffa12cca641fb539676fee";
  return fetch(
    `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&nameStartsWith=${search}`,
    {
      method: "GET"
    }
  ).then((r) => r.json());
}

export default SearchBar;
