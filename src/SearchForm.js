import React from 'react';
import style from './App.module.css';
import InputWithLabel from './InputWithLabel';
import { ReactComponent as Check } from './check.svg';

const SearchForm = ({
  searchTerm,
  onSearchSubmit,
  onSearchInput
}) => (
  <form onSubmit={onSearchSubmit} className={style.searchForm}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      type="text"
      isFocused
      onInputChange={onSearchInput}
      ><strong>Search: </strong></InputWithLabel>
    <button
      type="submit"
      disabled={!searchTerm}
      className={`${style.button} ${style.buttonLarge}`}
    >
      <Check height="18px" width="18px" />
    </button>
  </form>
)

export default SearchForm;