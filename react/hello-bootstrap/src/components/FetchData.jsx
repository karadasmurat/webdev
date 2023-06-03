import { useState, useEffect } from "react";

const URL1 = "https://jsonplaceholder.typicode.com/todos?userId=1";
const URL2 = "https://jsonplaceholder.typicode.com/users/1/todos";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // define an async function
    const fetchData = async () => {
      try {
        const response = await fetch(URL2);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    // call the async function defined.
    fetchData();
  }, []);

  return (
    <div>
      <h3>Todos fetched:</h3>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default FetchData;
