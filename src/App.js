import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const metalsAPI = {
    key: "bd8x58t67kikf2jueqzeex2g0hpysu9rbzlgm9vbu3of34yhla013s04dz3r",
    base: "https://www.metals-api.com/api/latest",
    currency: "USD",
    metals: "XAU,XAG",
  };

  const [metalPrices, setMetalPrices] = useState({});

  const fetchAPI = () => {
    axios
      .get(
        `${metalsAPI.base}?access_key=${metalsAPI.key}&base=${metalsAPI.currency}&${metalsAPI.metals}`
      )
      .then((response) => {
        setMetalPrices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // Error if error in retrieving data.
          console.log(error.response.data);
        } else if (error.request) {
          // Error if no response was received.
          console.log(error.request);
        } else {
          // Other errors.
          console.log(error.message);
        }
      });
  };

  const retrieveGold = () => {
    if (metalPrices !== {}) {
      return Math.round(1 / metalPrices.rates.XAU);
    }
  };

  const retrieveSilver = () => {
    if (metalPrices !== {}) {
      return Math.round(1 / metalPrices.rates.XAG);
    }
  };

  const Metals = () => {
    return (
      <div>
        <ul>
          <li>Gold: ${retrieveGold}</li>
          <li>Silver: ${retrieveSilver}</li>
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
