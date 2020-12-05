import React from 'react'
// Styles
import './App.css'

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
  // Stories
  const stories = [
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

  // Custom hook: Semi Persitent State
  const [
    searchTerm,
    setSearchTerm,
  ] = useSemiPersistentState('search', '')

  // Search Handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
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
      >
        Search:
      </InputWithLabel>

      <hr />

      <List list={searchedStories} />
    </div>
  )
}

const List = ({ list }) => (
  <div>
    {list.map(({ objectID, ...item }) => (
      <Item key={objectID} {...item} />
    ))}
  </div>
)

const Item = ({
  title,
  url,
  author,
  num_comments,
  points,
}) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
)

const InputWithLabel = ({
  id,
  value,
  onInputChange,
  type,
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      onChange={onInputChange}
      value={value}
    />
  </>
)

export default App
