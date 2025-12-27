import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/Home/Home'
import About from './pages/About/About' // 1. Import your About component
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} title="About Us" /> // 2. Add the route
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App