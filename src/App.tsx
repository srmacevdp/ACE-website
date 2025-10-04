import Layout from './util/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Hacks from './pages/Hacks'
import Nlp from './pages/Nlp'
import UberTech from './pages/UberTech'

const App = () => {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="/hacks" element={<Hacks/>}/>
          <Route path="/nlp" element={<Nlp/>}/>
          <Route path="/ubertech" element={<UberTech/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App