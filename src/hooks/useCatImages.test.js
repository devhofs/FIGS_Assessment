import { act, renderHook } from "@testing-library/react-hooks";
import { useCatImages } from "./useCatImages";
import {CAT_API_RESPONSE} from "../fixtures";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(CAT_API_RESPONSE),
  })
);

describe("useCatImages", () => {
  it("should return an object and a function", async () => {
    const { result } = renderHook(() => useCatImages());

    // wait for async code in the hook to finish
    // See, e.g.: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#2-when-testing-custom-hooks
    await act(() => Promise.resolve());

    // Testing that the hook returns an array
    expect(Array.isArray(result.current)).toBe(true);
    //Testing that the first element of the array is an array
    expect(typeof result.current[0]).toBe("object");
    //Testing that the second element of the array is a function
    expect(typeof result.current[1]).toBe("function");
  });

  it("should return images", async () => {
    const { result } = renderHook(() => useCatImages());

    // wait for async code in the hook to finish
    // See, e.g.: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#2-when-testing-custom-hooks
    await act(() => Promise.resolve());

    const {images} = result.current[0];
    expect(images.length).toBe(2);
    expect(images[0].id).toBe("15o");
    expect(images[1].url).toBe(
      "https://cdn2.thecatapi.com/images/217.jpg"
    );
    expect(images[0].breeds[0].name).toBe("Burmilla");
  });
});
