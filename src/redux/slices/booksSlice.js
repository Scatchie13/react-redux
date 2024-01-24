import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import createBookWithID from '../../utils/createBookWithID'

const initialState = []

const filterBooks = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload]
    },
    delBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
    },
    toggleFavorite: (state, action) => {
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      )
    },
  },
})

export const { addBook, delBook, toggleFavorite } = filterBooks.actions

export const thunkFunc = async (dispatch, getState) => {
  try {
    const res = await axios.get('http://localhost:4000/random-book')
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, 'via api')))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export const selectBooks = (state) => state.books

export default filterBooks.reducer
