import React from 'react';
import style from './App.module.css';

const InputWithLabel = ({ id, onInputChange, value, type, isFocused, children }) => {
  
  const inputref = React.useRef();

  React.useEffect(() => {
    if(isFocused) {
      inputref.current.focus();
    }
  }, [isFocused])
  
  return (
  <>
  <label htmlFor={id} className={style.label}>{children} </label>
  &nbsp;
      <input
        ref={inputref}
        id={id}
        onChange={onInputChange}
        value={value}
        type={type}
        className={style.input}
      />
  </>
  )
}

export default InputWithLabel;