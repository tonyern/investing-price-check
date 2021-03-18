import React, { useState } from "react";
import axios from "axios";
import "./asset-price-checker.css";

const AssetPriceChecker = () => {
  const metalsAPI = {
    key: "bd8x58t67kikf2jueqzeex2g0hpysu9rbzlgm9vbu3of34yhla013s04dz3r",
    base: "https://www.metals-api.com/api/latest",
    currency: "USD",
  };

  const [bitcoinPrice, setBitcoinPrice] = useState("---");
  const [bitcoinCashPrice, setBitcoinCashPrice] = useState("---");
  const [goldPrice, setGoldPrice] = useState("---");
  const [silverPrice, setSilverPrice] = useState("---");

  const fetchAPI = () => {
    axios
      .get(
        `${metalsAPI.base}?access_key=${metalsAPI.key}&base=${metalsAPI.currency}`
      )
      .then((response) => {
        console.log(response.data);
        setBitcoinPrice(Math.round(1 / response.data.rates.BTC));
        setBitcoinCashPrice(Math.round(1 / response.data.rates.BCH));
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
    <div className="asset-price-box">
      <div className="title">Current Asset Prices</div>

      <ul>
        <li className="asset">Bitcoin: ${bitcoinPrice}</li>
        <li className="asset">Bitcoin Cash: ${bitcoinCashPrice}</li>
        <li className="asset">Gold: ${goldPrice}</li>
        <li className="asset">Silver: ${silverPrice}</li>
      </ul>

      <button
        className="price-btn"
        data-testid="get-price-test"
        onClick={fetchAPI}
      >
        <p className="price-btn-title">Get Price</p>
      </button>
    </div>
  );
};

export default AssetPriceChecker;
