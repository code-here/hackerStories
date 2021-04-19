import style from './App.module.css';
import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import List from './List';
import Sort from './Sort';
import Pages from './Paginate';

const API_ENDPOINT ="https://hn.algolia.com/api/v1/search?query=";

//custom hook
const useSemiPersistentState = (key, initialState) => {

  const [ value, setValue ] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [ value, key ])

  return [ value, setValue ]
}

const storiesReducer = (state, action) => {
  switch(action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        pages: action.payload.pages,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SORT_STORIES_BY_TITLE":
      return {
          ...state,
          data: state.data.sort((a,b) => (a.title > b.title) ? 1 : -1),
      };
    case "SORT_STORIES_BY_AUTHOR":
      return {
          ...state,
          data: state.data.sort((a,b) => (a.author > b.author) ? 1 : -1),
      };
    case "SORT_STORIES_BY_COMMENTS":
      return {
          ...state,
          data: state.data.sort((a,b) => (a.num_comments < b.num_comments) ? 1 : -1),
      };
    case "SORT_STORIES_BY_POINTS":
      return {
          ...state,
          data: state.data.sort((a,b) => (a.points < b.points) ? 1 : -1),
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(story => action.payload.objectID !== story.objectID),
      };
    default:
      throw new Error();
  }
} 

const App = () => {
    
  const [ searchTerm, setSearchTerm ] = useSemiPersistentState('search', "React");

  const [ stories, dispatchStories ] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false, pages: 0 });
  
  const [ url, setUrl ] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [ activeButtons, setActiveButtons ] = React.useState({sort: 'none', pageno: 1});

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({
      type: "STORIES_FETCH_INIT"
    })
    try {
      const result = await axios.get(url)
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: { data: result.data.hits, pages: result.data.nbPages},
      })
    } catch{
      dispatchStories({
      type: "STORIES_FETCH_FAILURE"
      })
    };
  }, [url])

  React.useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])

  const handleRemoveStory = item => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item
    });
  }

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  }

  const handleSort = (param) => {
    dispatchStories({
      type: `SORT_STORIES_BY_${param}`
    });
    handleActive({sort: param})
  }

  const handlePaginate = (link, index) => {
    setUrl(link);
    handleActive({sort: 'none', pageno: index});
  }

  const handleActive = button => {
    setActiveButtons({...activeButtons, ...button});
  }

  return (
    <div className={style.container}>
      <h1 className={style.headlinePrimary}>My_hacker_stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <Sort handleSort={handleSort} activeButton={activeButtons}/>
      <hr />
      {stories.isError && <p>something went wrong...</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
      <List
        list={stories.data}
        sortedColumn={activeButtons.sort}
        onRemoveItem={handleRemoveStory}
      />
      )}
      <hr />
      <Pages pages={stories.pages} url={url.split("&page")[0]} handlePaginate={handlePaginate} handleActive={handleActive} activeButton={activeButtons}/>
    </div>
  );
}

export default App;
