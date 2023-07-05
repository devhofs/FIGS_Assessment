import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

global.scrollTo = jest.fn(() => {});

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const heading = getByText(/images of cats/i);
  expect(heading).toBeInTheDocument();
});
