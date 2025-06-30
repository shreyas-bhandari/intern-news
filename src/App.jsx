import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apiKey = "92a15b0fd04649229d3a186a25bd5f7d"; //API KEY
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          const articles = data.articles.map((article, index) => {
            console.log("Article URL:", article.url);
            return {
              id: index,
              title: article.title,
              body: article.description || article.content || "",
              url: article.url || "",
            };
          });
          setArticles(articles);
        } else {
          console.error("Error fetching news:", data);
        }
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>📰 Latest Posts</h1>
        <p style={{ color: "#555", fontSize: "1.1rem", marginTop: "8px" }}>
          Stay updated with the latest news and articles
        </p>
      </header>
      {articles.length === 0 && (
        <p style={{ textAlign: "center" }}>Loading posts...</p>
      )}
      <div className="grid">
        {articles.map((article) => (
          <div className="card" key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
      <footer style={{ textAlign: "center", marginTop: "60px", color: "#888", fontSize: "0.9rem" }}>
        &copy; 2024 CodTech News. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
