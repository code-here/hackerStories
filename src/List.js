import React from 'react';
import style from './App.module.css';

const List = ({ list, onRemoveItem, sortedColumn }) => (
  <div style={{ height: '55vh', overflowY: 'scroll'  }}>
    <div style={{ display: 'flex' }}>
    <span style={sortedColumn === 'TITLE' ? { width: '40%', fontWeight: 'bold'} : { width: '40%'}}>Title</span>
    <span style={sortedColumn === 'AUTHOR' ? { width: '30%', fontWeight: 'bold'} : { width: '30%'}}>Author</span>
    <span style={sortedColumn === 'COMMENTS' ? { width: '10%', fontWeight: 'bold'} : { width: '10%'}}>Comments</span>
    <span style={sortedColumn === 'POINTS' ? { width: '10%', fontWeight: 'bold'} : { width: '10%'}}>Points</span>
    <span style={sortedColumn === 'ACTIONS' ? { width: '10%', fontWeight: 'bold'} : { width: '10%'}}>Actions</span>
    </div>
    <hr />
    {list.map(item => <Item key={item.objectID} onRemoveItem={onRemoveItem} item={item}/>)}
  </div>
)

const Item = ({
  item,
  onRemoveItem
}) => {
return (
  <div className={style.item}>
    <span style={{ width: '40%'}}>
      <a href={item.url}>{item.title} </a>
    </span>
    <span style={{ width: '30%'}}>{item.author}</span>
    <span style={{ width: '10%'}}>{item.num_comments}</span>
    <span style={{ width: '10%'}}>{item.points}</span>
    <span style={{ width: '10%'}}>
      <button
        type="button"
        onClick={() => onRemoveItem(item)}
        className={`${style.button} ${style.buttonSmall}`}
      >
        Dismiss
      </button>
    </span>
  </div>
  )
}

export default List;