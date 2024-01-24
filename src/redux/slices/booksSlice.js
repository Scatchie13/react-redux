import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from './errorSlice'

const initialState = {
  books: [],
  isLoading: false,
}

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      throw error
    }
  }
)

const filterBooks = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },
    delBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      }
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoading = true
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoading = false
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, 'via api'))
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

export const { addBook, delBook, toggleFavorite } = filterBooks.actions

export const selectBooks = (state) => state.books.books
export const selectIsLoading = (state) => state.books.isLoading

export default filterBooks.reducer
