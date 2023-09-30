import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar/Navbar'

function App() {

  return (
    <>
      <CssBaseline/>
      <Router>
      <Navbar/>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
