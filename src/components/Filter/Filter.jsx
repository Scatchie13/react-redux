import { useDispatch, useSelector } from 'react-redux'
import {
  setTitleFilter,
  setAuthorFilter,
  selectTitleFilter,
  resetFilters,
  selectAuthorFilter,
  setOnlyFavoriteFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice'
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter())
  }

  const resetFilter = () => {
    dispatch(resetFilters())
  }

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            onChange={handleTitleFilterChange}
            type="text"
            value={titleFilter}
            placeholder="Filter by title"
          />
        </div>
        <div className="filter-group">
          <input
            onChange={handleAuthorFilterChange}
            value={authorFilter}
            type="text"
            placeholder="Filter by author"
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
              type="checkbox"
            />
            only favorite
          </label>
        </div>
        <button type="button" onClick={resetFilter}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Filter
