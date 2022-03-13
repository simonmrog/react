import React, { useState, useEffect } from "react";
import axios from "axios";

import News from "./News.jsx";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(false);
        setIsLoading(true);
        const result = await axios.get(
          `https://hn.algolia.com/api/v1/search?query=${search}`
        );
        setNews(result.data.hits);
      } catch (err) {
        console.error(err.message);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [search]);

  return (
    <>
      <h1>Hacker News List</h1>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search!
      </button>

      {error && <div>Something went wrong.</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {news.map((item) => (
            <li>
              <News key={item.objectID} data={item}></News>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NewsList;
