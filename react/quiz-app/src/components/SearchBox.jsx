import { useEffect, useState } from "react";
import "./SearchBox.css";
import { ListItem } from "./FormComponents";
import useToggle from "../hooks/useToggle";
import {
  Bs0CircleFill,
  Bs123,
  BsChevronDown,
  BsChevronUp,
  BsGrid,
} from "react-icons/bs";
import { toQueryString } from "../util/util";

export default function SearchBox({
  q,
  onSelect,
  action,
  url = "http://localhost:3000/api/tags",
  resultsDisplayConfig = {
    propertyName_title: "text",
    propertyName_subtitle: "_id",
  },
}) {
  console.log("SearchBox: render");
  // url = "https://jsonplaceholder.typicode.com/todos";

  // the value of this component, like form elements.
  const [value, setValue] = useState(q);

  // useEffect will fetch based on this state, representing q
  const [searchTerm, setSearchTerm] = useState(q);
  const [searchResults, setSearchResults] = useState([]);

  // set loading to true initially
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    const queries = { [resultsDisplayConfig.propertyName_title]: searchTerm };
    const queryString = toQueryString(queries);
    console.log("SearchBox: fetchData()", url + queryString);
    try {
      fetch(url + queryString)
        .then((response) => response.json())
        .then((data) => {
          console.log("fetchData(): data", data);
          // let filteredData = data.filter((todo) =>
          //   todo.title.toUpperCase().includes(searchTerm.toUpperCase())
          // );
          // setSearchResults(filteredData);
          setSearchResults(data);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    // wait(2000).then(() => {
    //   searchTerm && fetchData();
    // });

    // v1. fetch only when searchTerm is not empty
    // searchTerm && fetchData();

    // v2. fetch without prerequisites
    fetchData();
  }, [searchTerm]);

  // callback for click action on results
  const handleSelectResult = (selectedResult) => {
    setValue(selectedResult);
    console.log("click on result:", selectedResult);
    setSearchTerm("");

    // callback
    onSelect(selectedResult);
  };

  return (
    <div>
      <SearchInput q={searchTerm} setQ={setSearchTerm} />

      <SearchResults
        results={searchResults}
        isLoading={isLoading}
        action={action}
        onClick={handleSelectResult}
        resultsDisplayConfig={resultsDisplayConfig}
      />
    </div>
  );
}

function SearchInput({ q, setQ }) {
  return (
    <div className="input-group">
      <input
        type="text"
        name="q"
        id="q"
        className="form-control "
        placeholder="Type in to search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <span className="input-group-text bg-transparent">
        <i
          className="bi bi-search"
          style={{ fontSize: "1rem", color: "cornflowerblue" }}
        ></i>
      </span>
    </div>
  );
}

function SearchResults({
  results,
  isLoading,
  action,
  onClick,
  resultsDisplayConfig,
}) {
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
        <span> No matching result</span>
        <hr />
        {action}
      </div>
    );
  } else {
    return (
      <div className="container mt-2">
        <small class="text-body-secondary">
          {results.length} records found.
        </small>
        <ul
          className="list-group overflow-y-scroll"
          style={{ maxHeight: "200px" }}
        >
          {results.map((item) => (
            <div key={item._id} className="list-group-item p-0">
              {/* {item[resultsDisplayConfig.propertyName_title]} */}
              <ListItem
                leadingIcon={<BsGrid color="coral" />}
                title={item[resultsDisplayConfig.propertyName_title]}
                subtitle={item[resultsDisplayConfig.propertyName_subtitle]}
                onClick={onClick}
              />
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export function SelectWithSearch() {
  const [q, setQ] = useState("");
  const [val, setVal] = useState("Select Tags");

  const [searchable, toggleSearchable] = useToggle(false);

  const handleSelect = (selection) => {
    setVal(selection);
    // setQ(selection);
    toggleSearchable();
  };
  return (
    <>
      <div className="card p-2 mb-3">
        <div className="searchbox-header" onClick={toggleSearchable}>
          <strong>{val}</strong>
          {/* <input value={val} disabled className="border-0" /> */}

          {searchable ? <BsChevronUp /> : <BsChevronDown />}
        </div>

        {searchable && (
          <>
            <hr />
            <SearchBox q={q} onSelect={handleSelect} />
          </>
        )}
      </div>
    </>
  );
}
