import HomePage from './container/HomePage'
import ProductPage from './container/ProductPage'
import { Routes, Route } from "react-router-dom"

function App(props) {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:slug' element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App