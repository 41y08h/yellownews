import React, { useState, useEffect, createRef } from "react";
import Progressbar from "./components/Progressbar";
import NewsCard from "./components/NewsCard";
import darkMode from "./utils/darkMode";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  darkMode();

  const [progress, setProgress] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setProgress(parseInt(Math.random() * 100));
    axios.get("/api").then((res) => {
      setProgress(100);
      setArticles(res.data.articles);
    });
  }, []);

  return (
    <div className="paper container">
      <h1 className="text-warning text-center">YellowNews</h1>
      <Progressbar progress={progress} />
      {articles &&
        articles.map((article) => <NewsCard key={uuidv4()} {...article} />)}
    </div>
  );
}
