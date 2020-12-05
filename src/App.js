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

  // Search Handler
  const handleSearch = (e) => {
    console.log(e.target.value)
  }

  return (
    <div>
      <h1>Hacker Stories</h1>

      <Search onSearch={handleSearch} />

      <hr />

      <List list={stories} />
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
  // Search Term state
  const [
    searchTerm,
    setSearchTerm,
  ] = React.useState('')

  // Change Handler
  const handleChange = (e) => {
    setSearchTerm(e.target.value)

    // Callback Handler
    props.onSearch(e)
  }

  return (
    <div>
      <label htmlFor='search'>
        Search:{' '}
      </label>
      <input
        id='search'
        type='text'
        onChange={handleChange}
      />

      <p>
        Searching for{' '}
        <strong>{searchTerm}</strong>
        ...
      </p>
    </div>
  )
}

export default App
