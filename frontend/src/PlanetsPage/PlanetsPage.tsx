import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Defining types in typescript for our planets
type Planet = {
    name: string;
    diameter: string;
    climate: string;
    terrain: string;
    population: string;
    url: string;
}

export default function PlanetsPage(){
    const [planetsDB, setPlanetsDB] = useState([])
    const navigate = useNavigate()
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://swapi.dev/api/planets')
                const result = await response.json();
                setPlanetsDB(result.results)
            }
            catch (error) {
                navigate('/error')
            }
        } 
        fetchData()
    }, [navigate])

    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', fontSize: '3rem', flexDirection: 'column', mt: 70}}>
            {planetsDB.map((planet) => (
                <>
                    <h3>{planet.name}</h3>
                </>
            ))}
        </Box>
    )
}