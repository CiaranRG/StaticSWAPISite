import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Importing Utility
import CssBaseline from '@mui/material/CssBaseline';
// Importing Components
import Navbar from './Navbar/Navbar'
// Importing Our Pages
import HomePage from './Pages/Homepage';
import CharactersPage from './Pages/CharactersPage';
import ErrorPage from './Error Pages/PageNotFound';
import VehiclesPage from './Pages/VehiclesPage';
import PlanetsPage from './Pages/PlanetsPage';
import StarshipsPage from './Pages/StarshipsPage';
import ShowPage from './Pages/ShowPage';

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
          <Route path="/characters/:characterId" element={<ShowPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:vehicleId" element={<ShowPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/planets/:planetId" element={<ShowPage />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="/starships/:starshipId" element={<ShowPage />} />
          <Route path="/error" element={<ErrorPage error={{message: 'Page Not Found', code: '404'}}/>} />
          <Route path="*" element={<ErrorPage error={{message: 'Page Not Found', code: '404'}}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
