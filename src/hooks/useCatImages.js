import {useCallback, useEffect, useState} from "react";
import {filterCats} from "../utils/filterCatsUtils";

const BASE_URL = `https://api.thecatapi.com/v1/images/search?`;
const HEADERS = {
    "x-api-key": process.env.REACT_APP_CATAPI_API_KEY
};
const LIMIT = 10;

/**
 * @description Custom hook to fetch cat images from the cat API
 * @param deps
 * @returns {*[]}
 */
export function useCatImages(deps = []) {
  /**
   * @description State to hold the cat images
   */
  const [images, setImages] = useState([]);
  /**
   * @description State to hold the current page of cat images
   */
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);

  /**
   * @description Function to fetch an array of cat information including breeds and images
   * @type {function(*): Promise<any>}
   */
  const getPaginatedCats = (pageNum = 0) => fetch(`${BASE_URL}limit=${LIMIT}&has_breeds=1&page=${pageNum}`, { headers: HEADERS })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        console.error("fetch failed!");
        console.error(e);
      });
  const getCatsUseCallback = useCallback(getPaginatedCats, []);

  /*
    * @description Fetch the first page of cat images on load
   */
  useEffect(() => {
    setLoading(true)
    getCatsUseCallback()
      .then((res) => {
        setImages(filterCats(res));
      })
      .finally(() => setLoading(false));
  }, [getCatsUseCallback]);

  const advancePagination = () => {
    setLoading(true)
    const newPage = page + 1;
    getPaginatedCats(newPage)
      .then((res) => {
        const cats = filterCats([...images, ...res]);
        setImages(cats);
        setPage(newPage);
      })
      .finally(() => setLoading(false));
  }

  /**
   * @description Since this is a hook, I'm choosing to return in the pattern of [data, function]
   */
  return [{images, loading}, advancePagination];
}