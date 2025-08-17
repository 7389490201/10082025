import { Route, Routes } from "react-router-dom"
import Home from "./containers/Home"
import Signin from "./containers/SignIn"
import Signup from "./containers/Signup"
import PrivateRoute from './components/Hoc/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, isUserLoggedin } from "./actions"
import { useEffect } from "react"
import Products from "./containers/Products"
import Orders from "./containers/Orders"
import Category from "./containers/Category"




function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedin())
      dispatch(getAllCategory())
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/category' element={<PrivateRoute><Category /></PrivateRoute>} />
        <Route path='/products' element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App