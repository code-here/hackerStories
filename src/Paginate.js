import React from 'react';
import style from './App.module.css';

const Pages = ({ pages, url, handlePaginate, activeButton }) => {
    let links = [];
    for(let i = 1; i <= pages; i++) {
      links.push(`${url}&page=${i}`);
    }
  return (
    <div style={{ display: 'flex', overflowX: 'scroll', paddingBottom: '5px'}}>
      <span style={{ padding: '5px'}}>Go To: </span>
      {links.map((link, index) => (
        <button
          type="button"
          key={index + 1}
          onClick={() => handlePaginate(link, index+1)}
          className={`${style.button} ${style.buttonSmall} ${activeButton.pageno === index+1 ? style.active : ''}`}
        >
          {index + 1 }
        </button>
      ))}

    </div>
  )
}

export default Pages;