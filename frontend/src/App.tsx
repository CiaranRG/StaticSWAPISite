import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Importing Utility
import CssBaseline from '@mui/material/CssBaseline';
// Importing Components
import Navbar from './Navbar/Navbar'
// Importing Our Pages
import HomePage from './HomePage/Homepage';
import CharactersPage from './CharactersPage/CharactersPage';
import ErrorPage from './Error Pages/PageNotFound';
import VehiclesPage from './VehiclesPage/VehiclesPage';
import PlanetsPage from './PlanetsPage/PlanetsPage';

function App() {

  return (
    <>
      <CssBaseline/>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/error" element={<ErrorPage error={{message: 'Page Not Found', code: '404'}}/>} />
          <Route path="*" element={<ErrorPage error={{message: 'Page Not Found', code: '404'}}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
