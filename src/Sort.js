import React from 'react';
import style from './App.module.css';

const Sort = ({ handleSort, activeButton }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%', alignItems: 'baseline'}}>
    <span>Sort by</span>
    <SortButton handleSort={handleSort} activeButton={activeButton} >TITLE</SortButton>
    <SortButton handleSort={handleSort} activeButton={activeButton} >AUTHOR</SortButton>
    <SortButton handleSort={handleSort} activeButton={activeButton} >COMMENTS</SortButton>
    <SortButton handleSort={handleSort} activeButton={activeButton} >POINTS</SortButton>
  </div>
)

const SortButton = ({ handleSort, children, activeButton }) => (
  <button
    onClick={() => handleSort(children)}
    className={`${style.button} ${style.buttonSmall} ${activeButton.sort === children ? style.active : ''}`}
  >
  {children}
  </button>
)

export default Sort;