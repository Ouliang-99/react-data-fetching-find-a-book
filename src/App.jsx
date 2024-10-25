import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [resultInputSearch, setResultInputSearch] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const getData = async (input) => {
    try {
      const books = await axios.get(
        `https://openlibrary.org/search.json?q=${input}`
      );
      setResultInputSearch(books.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputSearch)
    getData(inputSearch);
  }, [inputSearch]);

  const handleInputSearch = (event) => {
    setInputSearch(event.target.value);
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        className="search"
        value={inputSearch}
        onChange={handleInputSearch}
        placeholder="Search here"
      />
      <ul>
        {resultInputSearch.map((text, index) => {
          return <li key={index}>{text.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
