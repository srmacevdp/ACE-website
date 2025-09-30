import Layout from './util/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App