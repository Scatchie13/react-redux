import { useDispatch, useSelector } from 'react-redux'
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
} from '../../redux/slices/filterSlice'
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
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
          <button type="button" onClick={resetFilter}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
