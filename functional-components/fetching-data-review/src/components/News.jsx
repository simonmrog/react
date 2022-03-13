import React from "react";

const News = ({ data }) => {
  return (
    <>
      <h3>{data.title}</h3>
      <h4>{data.author}</h4>
      <a href={data.url}>{data.url}</a>
    </>
  );
};

export default News;
