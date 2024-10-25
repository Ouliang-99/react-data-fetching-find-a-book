import { useEffect, useState } from "react";
import axios from "axios";

export function FindABook() {
  const [inputText, setInputText] = useState("");
  const [bookList, setBookList] = useState([]);
  const getBookList = async () => {
    try {
      const results = await axios.get(
        `https://openlibrary.org/search.json?q=${inputText}`
      );
      setBookList(results.data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookList();
  }, [inputText]);
  return (
    <div>
      <h1>Find a Book</h1>
      <input
        placeholder="Search a book"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></input>
      <div>
        <ul>
          {bookList.map((book) => (
            <li key={book.key}>{book.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
