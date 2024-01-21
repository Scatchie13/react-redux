import { createSlice } from '@reduxjs/toolkit'

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

export const selectBooks = (state) => state.books

export default filterBooks.reducer
