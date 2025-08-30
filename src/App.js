import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      // Call your backend API instead of OpenLibrary directly
      const response = await fetch(
        `http://localhost:5000/api/books?title=${query}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setError("No books found. Try another title.");
      } else {
        setBooks(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">📚 Book Finder</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {/* Loading */}
      {loading && <p className="loading">Loading...</p>}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Book List */}
      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h2>{book.title}</h2>
            <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
            <small>First Published: {book.first_publish_year || "N/A"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
