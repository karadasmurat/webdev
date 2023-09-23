import { useState, useEffect } from "react";

export default function FetchDemo() {
  const [btcData, setBtcData] = useState({});
  const [user, setUser] = useState({});

  const fetchUser = () => {
    fetch("https://randomuser.me/api/?results=1")
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        setUser(data.results[0]);
      })
      .catch((error) => console.log(error));
  };
  const fetchData = () => {
    fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        setBtcData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // fetchData();
    fetchUser();
  }, []);

  return Object.keys(user).length > 0 ? (
    // <div class="card" style={{ width: "18rem" }}>
    //   <div class="card-header">{btcData.chartName}</div>
    //   <div class="card-body">
    //     <h5 class="card-title">{btcData.chartName}</h5>
    //     <h6 class="card-subtitle mb-2 text-body-secondary">
    //       {btcData.disclaimer}
    //     </h6>
    //   </div>
    //   <ul class="list-group list-group-flush">
    //     <li class="list-group-item">Code: {btcData.bpi.USD.code}</li>
    //     <li class="list-group-item">Rate: {btcData.bpi.USD.rate}</li>
    //   </ul>
    // </div>

    <div>
      <p>Name: {user.name.first}</p>
      <img src={user.picture.medium} alt="Profile Picture" />
    </div>
  ) : (
    <h1>Data pending...</h1>
  );
}
