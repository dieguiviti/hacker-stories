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
  ] = React.useState('')

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

const List = (props) => {
  return (
    <div>
      {props.list.map((item) => (
        <div key={item.objectID}>
          <span>
            <a href={item.url}>
              {item.title}
            </a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
        </div>
      ))}
    </div>
  )
}

const Search = (props) => {
  return (
    <div>
      <label htmlFor='search'>
        Search:{' '}
      </label>
      <input
        id='search'
        type='text'
        onChange={props.onSearch}
        value={props.searchTerm}
      />
    </div>
  )
}

export default App
