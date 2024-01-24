import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { clearError, selectErrorMsg } from '../../redux/slices/errorSlice'

const Error = () => {
  const errorMsg = useSelector(selectErrorMsg)
  const dispatch = useDispatch()

  useEffect(() => {
    if (errorMsg) {
      toast.info(errorMsg)
      dispatch(clearError())
    }
  }, [errorMsg, dispatch])

  return <ToastContainer position="top-right" autoClose={2000} />
}

export default Error
