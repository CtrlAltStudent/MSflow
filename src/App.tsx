import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Downloads from './pages/Downloads'

/**
 * Aplikacja Blackframe / msflow.pl – routing do stron głównych.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="o-mnie" element={<About />} />
          <Route path="projekty" element={<Projects />} />
          <Route path="pobieralnia" element={<Downloads />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
