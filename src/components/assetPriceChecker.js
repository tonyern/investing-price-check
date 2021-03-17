import React, { useState } from "react";
import axios from "axios";

const AssetPriceChecker = () => {
  const metalsAPI = {
    key: "bd8x58t67kikf2jueqzeex2g0hpysu9rbzlgm9vbu3of34yhla013s04dz3r",
    base: "https://www.metals-api.com/api/latest",
    currency: "USD",
    metals: "XAU,XAG",
  };

  const [bitcoinPrice, setBitcoinPrice] = useState("---");
  const [goldPrice, setGoldPrice] = useState("---");
  const [silverPrice, setSilverPrice] = useState("---");

  const fetchAPI = () => {
    axios
      .get(
        `${metalsAPI.base}?access_key=${metalsAPI.key}&base=${metalsAPI.currency}&${metalsAPI.metals}`
      )
      .then((response) => {
        console.log(response.data);
        setBitcoinPrice(Math.round(1 / response.data.rates.BTC));
        setGoldPrice(Math.round(1 / response.data.rates.XAU));
        setSilverPrice(Math.round(1 / response.data.rates.XAG));
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

  return (
    <div>
      <h1>Current Prices of Assets</h1>
      <ul>
        <li>Bitcoin: ${bitcoinPrice}</li>
        <li>Gold: ${goldPrice}</li>
        <li>Silver: ${silverPrice}</li>
        <button onClick={fetchAPI}>Get Price</button>
      </ul>
    </div>
  );
};

export default AssetPriceChecker;
