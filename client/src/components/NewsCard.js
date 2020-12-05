import React from "react";

export default function NewsCard(props) {
  return (
    <div className="card margin-top-large">
      <img src={props.urlToImage} alt="news image" />
      <div className="card-body">
        <h4 className="card-title">{props.title}</h4>
        <h5 className="card-subtitle">
          {props.author} | {new Date(props.publishedAt).toLocaleDateString()}
        </h5>
        <p className="card-text">{props.description}</p>
        <a href={props.url} target="_blank">
          Read More
        </a>
      </div>
    </div>
  );
}
