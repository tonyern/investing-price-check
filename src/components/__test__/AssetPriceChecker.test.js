import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AssetPriceChecker from "../AssetPriceChecker/AssetPriceChecker";

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AssetPriceChecker />, div);
});

it("Asset price checker snapshot test", () => {
  const tree = renderer.create(<AssetPriceChecker />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Testing get price button", () => {
  const { getByTestId } = render(<AssetPriceChecker />);
  expect(getByTestId("get-price-test")).toHaveTextContent("Get Price");
});
