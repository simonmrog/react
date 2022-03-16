import React from "react";

const News = ({ data }) => {
  return (
    <>
      <h3>{data.title}</h3>
      <h4>{data.author}</h4>
      <a target="_blank" rel="noreferrer" href={data.url}>
        {data.url}
      </a>
    </>
  );
};

export default News;
