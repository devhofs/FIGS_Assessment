import React, {useLayoutEffect, useRef, useState, useEffect, useCallback} from "react";
import { useCatImages } from "./hooks/useCatImages";
import "./App.css";
import {MemoizedTile} from "./components/Tile";
import {searchCatBreeds} from "./utils/filterCatsUtils";

function App() {
  const [{images, loading}, fetchMoreImages] = useCatImages();
  const [fliteredImages, setFilteredImages] = useState(images);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 812);


  /**
   * This effect clears the search text when the user hides the breed info
   */
  useEffect(() => {
    if(showMoreInfo) return;
    setSearchText('');
  }, [ showMoreInfo, searchText ]);


  useEffect(() => {
    const breedSpecificImages =  searchCatBreeds(images, searchText);
    setFilteredImages(breedSpecificImages);
  }, [images, searchText]);

  const preventFetchMore = () =>
    !scrollRef.current
    || searchText.trim().length > 0
    || loading
  const preventFetchMorewithCallback = useCallback(preventFetchMore, []);

  const scrollRef = useRef();
  /*
    * Intended behavior is that the app fetches more cats, but retains the scroll position
    * I chose to use useLayoutEffect here because it runs before the DOM is updated
   */
  useLayoutEffect(() => {
    //eject early if the ref hasn't loaded or there's search text
    if(preventFetchMorewithCallback()) return;

    // maintain scroll position
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      const scrollPosition = scrollHeight
      const currentScroll = scrollHeight-scrollPosition
      window.scrollTo(0, currentScroll)
    }
  }, [images, searchText, loading, preventFetchMorewithCallback])
  const handleScroll = () => {
    //eject early if we are already loading or the ref hasn't loaded
    if(preventFetchMore()) return;

    // if we are near the bottom of the page, fetch more cats.
    // increase bufferFromBottom to make the next set of images load sooner
    const bufferFromBottom = 1000;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight + bufferFromBottom >= scrollHeight ) {
      fetchMoreImages();
    }
  };

  const handleLayoutToggle = () => {
    setIsMobile(!isMobile);
  }

  const computedSearchBarClassName = () => showMoreInfo ? "searchBar" : "searchBar-hidden";
  const computedLayoutClassName = () => `${isMobile ? 'list' : 'grid'}${showMoreInfo ? ' showMoreInfo' : ''}`

  return (
    <>
      <div className="header">
        <h1>Images of Cats</h1>
        <div className={"controlContainer"}>
          <label className="toggle">
            <input
              type="checkbox"
              checked={isMobile}
              onChange={() => handleLayoutToggle()}
            />
            List View
          </label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={showMoreInfo}
              onChange={() => setShowMoreInfo(!showMoreInfo)}
            />
            Show more info
          </label>
        </div>
      </div>
      <div className={computedSearchBarClassName()}>
        <label htmlFor={'search'} className={'sr-only'}>Search Breeds</label>
        <input id={'search'} type={"text"} placeholder={'Search Breeds'} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      </div>
      <ul
        ref={scrollRef}
        onScroll={handleScroll}
        className={computedLayoutClassName()}
      >
        {fliteredImages.map(({ id, height, url, width, breeds }) => (
          <MemoizedTile
            id={id}
            key={id}
            height={height}
            url={url}
            breeds={breeds}
            width={width}
            showMoreInfo={showMoreInfo}
            isMobile={isMobile}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
