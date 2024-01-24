import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addBook,
  fetchBook,
  selectIsLoading,
} from '../../redux/slices/booksSlice'
import { setError } from '../../redux/slices/errorSlice'
import { FaSpinner } from 'react-icons/fa'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'

import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, 'manual')))

      setAuthor('')
      setTitle('')
    } else {
      dispatch(setError('You must full title and author'))
    }
  }

  const addRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]

    dispatch(addBook(createBookWithID(randomBook, 'random')))
  }

  const addRandomViaApi = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
  }

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="autor">Author: </label>
          <input
            type="text"
            id="autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={addRandomBook}>
          Add Random
        </button>

        <button disabled={isLoading} type="button" onClick={addRandomViaApi}>
          {isLoading ? (
            <>
              <span>Loading...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add Random Via Api'
          )}
        </button>
      </form>
    </div>
  )
}

export default BookForm
