import { useEffect, useState } from "react";
import "./SearchBox.css";
import { DismissableBadge, ListItem } from "./FormComponents";
import useToggle from "../hooks/useToggle";
import {
  Bs0CircleFill,
  Bs123,
  BsChevronDown,
  BsChevronUp,
  BsGrid,
} from "react-icons/bs";
import { toQueryString } from "../util/util";
import { AnimatePresence } from "framer-motion";

export default function SearchBox({
  url = "http://localhost:3000/api/tags",
  q,
  values,
  onSelectResult,
  action,
  resultsDisplayConfig = {
    propertyName_title: "text",
    propertyName_subtitle: "_id",
  },
}) {
  console.log("SearchBox: render", url, q, values);
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

  return (
    <div>
      <SearchInput q={searchTerm} setQ={setSearchTerm} />

      <SearchResults
        results={searchResults}
        values={values}
        isLoading={isLoading}
        action={action}
        onClick={onSelectResult}
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
  values = [],
  isLoading,
  action,
  onClick,
  resultsDisplayConfig,
}) {
  const getSelectionStatus = (item) => {
    // console.log("checked for:", item);
    return values.includes(item);
  };

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
        <small className="text-body-secondary">
          {results.length} records found.
        </small>
        <ul
          className="list-group overflow-y-scroll"
          style={{ maxHeight: "200px" }}
        >
          {results.map((item) => (
            <li key={item._id} className="list-group-item p-0">
              {/* {item[resultsDisplayConfig.propertyName_title]} */}
              <ListItem
                checkbox
                checked={getSelectionStatus(
                  item[resultsDisplayConfig.propertyName_title]
                )}
                leadingIcon={<BsGrid color="coral" />}
                title={item[resultsDisplayConfig.propertyName_title]}
                subtitle={item[resultsDisplayConfig.propertyName_subtitle]}
                onClick={onClick}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export function SelectWithSearch({ url }) {
  const [q, setQ] = useState("");
  // single select
  const [val, setVal] = useState();

  // multi-select
  const [values, setValues] = useState(["New"]);

  const [searchable, toggleSearchable] = useToggle(false);

  const placeholder = "Select Tags";

  const handleSelectOption = (selection) => {
    // single
    setVal(selection);

    // multi values
    // if it already contains, remove
    // else, add
    if (values.includes(selection)) {
      console.log("Values already contains, removing.", selection);
      setValues(values.filter((v) => v !== selection));
    } else {
      console.log("Adding", selection);
      setValues([...values, selection]);
    }

    // Close select
    // toggleSearchable();
  };

  const toggleSelectMenu = () => {
    console.log("Toggle Select Menu!");
    toggleSearchable();
  };

  const dismissBadge = (e, val) => {
    console.log("Dismiss badge:", val);

    // single
    setVal(undefined);

    // multi
    setValues(values.filter((v) => v != val));

    // prevent the event from reaching ancestors of the target element - Event bubbling
    e.stopPropagation();
  };

  return (
    <>
      <div className="card p-2 mb-1">
        <div className="searchbox-header" onClick={toggleSelectMenu}>
          {/* badges container */}

          <div className="d-flex flex-wrap gap-1">
            <AnimatePresence>
              {values.length > 0
                ? values.map((value) => (
                    <DismissableBadge
                      key={value}
                      text={value}
                      onClose={(e) => dismissBadge(e, value)}
                    />
                  ))
                : placeholder}
            </AnimatePresence>
          </div>

          {searchable ? <BsChevronUp /> : <BsChevronDown />}
        </div>
      </div>
      {searchable && (
        <div className="card p-2 mb-3">
          <SearchBox
            url={url}
            q={q}
            values={values}
            onSelectResult={handleSelectOption}
          />
        </div>
      )}
    </>
  );
}
