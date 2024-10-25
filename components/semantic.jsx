import { useState, useEffect } from "react";
import axios from "axios";

export function SearchField() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === "") {
        setBooks([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}`
        );
        setBooks(response.data.items || []);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    handleSearch();

  }, [query])
  return (
    <main>
      <h1>Find a Book</h1>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <h3>{book.volumeInfo.title}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </main>
  );
}
