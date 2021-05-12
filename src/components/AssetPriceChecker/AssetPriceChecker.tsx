import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./asset-price-checker.css";

const AssetPriceChecker = (): JSX.Element => {
  const { REACT_APP_METALS_API_ACCESS_KEY } = process.env;
  const metalsAPI = {
    base: "https://www.metals-api.com/api/latest",
    currency: "USD",
  };

  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [bitcoinCashPrice, setBitcoinCashPrice] = useState(0);
  const [goldPrice, setGoldPrice] = useState(0);
  const [silverPrice, setSilverPrice] = useState(0);

  const dateBuilder = (d: Date): string => {
    let months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return `${days[d.getDay()]}, ${d.getDate()} 
      ${months[d.getMonth()]} ${d.getFullYear()}`
  };

  const fetchAPI = (): void => {
    axios
      .get(
        `${metalsAPI.base}?access_key=${REACT_APP_METALS_API_ACCESS_KEY}&base=${metalsAPI.currency}`
      )
      .then((response: AxiosResponse<any>) => {
        console.log(response.data);
        setBitcoinPrice(Math.round(1 / response.data.rates.BTC));
        setBitcoinCashPrice(Math.round(1 / response.data.rates.BCH));
        setGoldPrice(Math.round(1 / response.data.rates.XAU));
        setSilverPrice(Math.round(1 / response.data.rates.XAG));
      })
      .catch((error: any) => {
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
      {dateBuilder(new Date())}

      <table>
        <tbody>
          <tr>
            <th>Bitcoin:</th>
            <td>${bitcoinPrice}</td>
          </tr>
          <tr>
            <th>Bitcoin Cash:</th>
            <td>${bitcoinCashPrice}</td>
          </tr>
          <tr>
            <th>Gold:</th>
            <td>${goldPrice}</td>
          </tr>
          <tr>
            <th>Silver:</th>
            <td>${silverPrice}</td>
          </tr>
        </tbody>
      </table>

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
