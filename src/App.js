import React, { useState } from "react";

const App = () => {
  const metalsAPI = {
    key: "bd8x58t67kikf2jueqzeex2g0hpysu9rbzlgm9vbu3of34yhla013s04dz3r",
    base: "https://www.metals-api.com/api/latest",
    currency: "USD",
    metals: "XAU,XAG",
  };

  const [metalPrices, setMetalPrices] = useState({});

  const fetchAPI = () => {
    fetch(
      `${metalsAPI.base}?access_key=${metalsAPI.key}&base=${metalsAPI.currency}&${metalsAPI.metals}`
    )
      .then((res) => res.json())
      .then((result) => {
        setMetalPrices(result);
        console.log(result);
      });
  };

  const Metals = () => {
    return (
      <div>
        <ul>
          <li>Gold:</li>
          <li>Silver:</li>
          <button onClick={fetchAPI}>Get Price</button>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Current Price of Gold & Silver</h1>
      <Metals />
    </div>
  );
};

export default App;
