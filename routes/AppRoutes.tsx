import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import About from '../src/pages/About/About'
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AppRoutes