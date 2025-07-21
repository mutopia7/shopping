import { useState } from 'react'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header / >
      <Footer />
    </>
  )
}

export default App
