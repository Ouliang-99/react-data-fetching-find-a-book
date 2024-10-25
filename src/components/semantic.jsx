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
          `https://openlibrary.org/search.json?q=${query}`
        );
        console.log(response.data);
        setBooks(response.data.docs || []);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    handleSearch();

  }, [query]);

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
              <li key={book.key}>
                <h3>{book.title}</h3>
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
