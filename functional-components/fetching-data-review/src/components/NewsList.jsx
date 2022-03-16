import React, { useState } from "react";

import { useFetch } from "../hooks/useFetch.js";
import News from "./News.jsx";

const NewsList = () => {
  const [query, setQuery] = useState("");
  const [{ data: news, isLoading, error }, setFetch] = useFetch(
    "https://hn.algolia.com/api/v1/search"
  );

  return (
    <>
      <h1>Hacker News List</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search!</button>
      </form>
      {error && <div>Something went wrong: {error.message}</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {news &&
            news.hits.map((item) => (
              <li key={item.objectID}>
                <News data={item}></News>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default NewsList;
