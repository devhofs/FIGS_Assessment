import React from "react";
import "./Tile.css";

const Tile = ({id, breeds, url, height, width, showMoreInfo, isMobile}) => {
  return (
    <li key={id} className={'tile'}>
      <div hidden={!showMoreInfo} className={showMoreInfo ? 'moreInfo' : ''}>
        <h2>{breeds[0].name}</h2>
        <p>{breeds[0].description}</p>
      </div>
      <img className={isMobile ? 'list' : 'grid'} src={url} alt={`A ${breeds[0].name} cat.`} height={height} width={width}/>
    </li>
  )
}

export const MemoizedTile = React.memo(Tile);