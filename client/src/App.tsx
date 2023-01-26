import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import ErrorPage from './pages/ErrorPage'

function App() {

  return (
    <main className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  )
}

export default App
