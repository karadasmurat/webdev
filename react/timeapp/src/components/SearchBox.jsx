import { useEffect, useState } from "react";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // set loading to true initially
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => {
          let filteredData = data.filter((todo) =>
            todo.title.toUpperCase().includes(searchTerm.toUpperCase())
          );

          setSearchResults(filteredData);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    searchTerm && setTimeout(fetchData, 2000);
  }, [searchTerm]);

  return (
    <div className="container my-2">
      <SearchInput q={searchTerm} setQ={setSearchTerm} />
      {searchTerm && (
        <SearchResults results={searchResults} isLoading={isLoading} />
      )}
    </div>
  );
}

function SearchInput({ q, setQ }) {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text bg-transparent">
          <i
            className="bi bi-search"
            style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
          ></i>
        </span>

        <input
          type="text"
          name="q"
          id="q"
          className="form-control border-start-0"
          placeholder="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
    </>
  );
}

function SearchResults({ results, isLoading }) {
  // if the results prop has a length of zero, display an info message
  if (isLoading) {
    return (
      <div className="spinner-border m-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  } else if (results.length == 0) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="bi bi-info-square"></i>
        <span> No results found.</span>
      </div>
    );
  } else {
    return (
      <ul className="list-group">
        {results.map((todo) => (
          // <li class="list-group-item" key={todo.id}>
          <a
            href="#"
            className="list-group-item list-group-item-action"
            key={todo.id}
          >
            {todo.title}
          </a>
          // </li>
        ))}
      </ul>
    );
  }
}
