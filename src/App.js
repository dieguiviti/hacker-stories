import React from 'react'
// Styles
import './App.css'

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

  // state
  const [
    searchTerm,
    setSearchTerm,
  ] = React.useState(
    window.localStorage.getItem('search') ||
      ''
  )

  // side-effects
  React.useEffect(() => {
    window.localStorage.setItem(
      'search',
      searchTerm
    )
  }, [searchTerm])

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

      <Search
        search={searchTerm}
        onSearch={handleSearch}
      />

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

const Search = ({
  searchTerm,
  onSearch,
}) => (
  <div>
    <label htmlFor='search'>Search: </label>
    <input
      id='search'
      type='text'
      onChange={onSearch}
      value={searchTerm}
    />
  </div>
)

export default App
