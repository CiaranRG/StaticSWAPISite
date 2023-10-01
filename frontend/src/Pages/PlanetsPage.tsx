import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [planetsDB, setPlanetsDB] = useState<Planet[]>([])
    const [isLoading, setIsloading] = useState<boolean>(true)
    const navigate = useNavigate()
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            let nextURL = 'https://swapi.dev/api/planets'
            let allData: Planet[] = []
            try {
                while (nextURL && isMounted){
                    const response = await fetch(nextURL)
                    const result = await response.json();
                    // If the response from the server was not between 200-299 this is error is thr
                    if (!response.ok){
                        throw new Error('Connection Error!')
                    }
                    allData = [...allData, ...result.results]
                    nextURL = result.next
                }
                // The page is breaking out of the while loop for some reason, have a better look at later
                setPlanetsDB(allData)
                setIsloading(false)
            }
            catch (error) {
                navigate('/error', {state: { error }})
            }
        } 
        fetchData()
        return () => {
            isMounted = false
        }
    }, [navigate])

    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '4px solid black', marginBottom: '30px', padding: '20px', borderRadius: '10px'}}>Planets</Typography>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center',height: '55vh', mt: '10'}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                // Adding an index so it has a numbered key
                planetsDB.map((planet) => (
                    <div key={planet.url} style={{textAlign: 'center', border: '4px solid black', marginBottom: '30px', padding: '20px', borderRadius: '10px'}}>
                    <Typography component="h3" variant='h3' sx={{mb: 2, textTransform: 'capitalize'}}>{planet.name}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Diameter: {planet.diameter}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Climate: {planet.climate}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Terrain: {planet.terrain}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Population: {planet.population}</Typography>
                    <Button variant="contained">View More</Button>
                    </div>
            ))}
        </Box>
    )
}