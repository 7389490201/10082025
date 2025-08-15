import { Route, Routes } from "react-router-dom"
import Home from "./containers/Home"
import Signin from "./containers/SignIn"
import Signup from "./containers/Signup"
import PrivateRoute from './components/Hoc/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedin } from "./actions"
import { useEffect } from "react"




function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedin())
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App