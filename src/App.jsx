import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/Home/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

