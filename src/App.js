import React from 'react'
// Styles
import './App.css'

// Initial Stories
const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload
    case 'REMOVE_STORY':
      return state.filter(
        (story) =>
          story.objectID !== action.payload
      )
    default:
      throw new Error(
        `error with state:\n${JSON.stringify(
          state
        )}\nerror with action:\n${JSON.stringify(
          action
        )}`
      )
  }
}

const useSemiPersistentState = (
  key,
  initialState
) => {
  const [value, setValue] = React.useState(
    window.localStorage.getItem(key) ||
      initialState
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}

const App = () => {
  // State
  const [
    stories,
    dispatchStories,
  ] = React.useReducer(storiesReducer, [])
  const [
    isLoading,
    setIsLoading,
  ] = React.useState(false)
  const [error, setError] = React.useState(
    false
  )

  // Asynchronous data load effect
  React.useEffect(() => {
    setIsLoading(true)

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: 'SET_STORIES',
          payload: result.data.stories,
        })
        setIsLoading(false)
      })
      .catch((error) => setError(true))
  }, [])

  // Custom hook: Semi Persitent State
  const [
    searchTerm,
    setSearchTerm,
  ] = useSemiPersistentState('search', '')

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: {
              stories: initialStories,
            },
          }),
        1500
      )
    )

  // Search Handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Handle story removal
  const handleStoryRemoval = (id) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: id,
    })
  }

  // Searched stories
  const searchedStories = stories.filter(
    (story) =>
      story.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>Hacker Stories</h1>

      <InputWithLabel
        value={searchTerm}
        onInputChange={handleSearch}
        type='search'
        id='search'
        isFocused
      >
        Search:
      </InputWithLabel>

      <hr />

      {error && (
        <p>Something went wrong...</p>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List
          list={searchedStories}
          onRemoveItem={handleStoryRemoval}
        />
      )}
    </div>
  )
}

const List = ({ list, onRemoveItem }) => (
  <div>
    {list.map((item) => (
      <Item
        key={item.objectID}
        {...item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </div>
)

const Item = ({
  objectID,
  title,
  url,
  author,
  num_comments,
  points,
  onRemoveItem,
}) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
    <span>
      <button
        type='button'
        onClick={() =>
          onRemoveItem(objectID)
        }
      >
        Dismiss
      </button>
    </span>
  </div>
)

const InputWithLabel = ({
  id,
  value,
  onInputChange,
  type,
  children,
  isFocused,
}) => {
  // Input reference
  const inputRef = React.useRef()

  // Side effect to programmatically focus component
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        autoFocus={isFocused}
        id={id}
        type={type}
        onChange={onInputChange}
        value={value}
      />
    </>
  )
}

export default App
