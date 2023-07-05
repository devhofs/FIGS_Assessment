import React from "react";
import { render } from "@testing-library/react";
import {CAT_API_RESPONSE} from "../fixtures";
import {MemoizedTile} from "./Tile";

// Shared Constants
const {id, height, url, width, breeds} = CAT_API_RESPONSE[0]
const expectedAltText = `A ${breeds[0].name} cat.`;
test("MemoizedTile renders the image and alt text, but not the description when showMoreInfo is false", () => {
  const {getByAltText, queryByText} = render(
    <MemoizedTile
      breeds={breeds}
      height={height}
      id={id}
      url={url}
      width={width}
      showMoreInfo={false}
    />);

  // Testing <img> tag is present
  const altText = getByAltText(expectedAltText);
  expect(altText).toBeInTheDocument();

  // Testing that the description is not present.
  const expectedDescription = queryByText(breeds[0].description);
  expect(expectedDescription).not.toBeVisible();
});

test("MemoizedTile renders the image, alt text, and description when showMoreInfo is true", () => {
  const {getByAltText, queryByText} = render(
    <MemoizedTile
      breeds={breeds}
      height={height}
      id={id}
      url={url}
      width={width}
      showMoreInfo={true}
    />);

  // Testing <img> tag is present
  const altText = getByAltText(expectedAltText);
  expect(altText).toBeInTheDocument();

  // Testing that the description is present.
  const expectedDescription = queryByText(breeds[0].description);
  expect(expectedDescription).toBeVisible();
});
