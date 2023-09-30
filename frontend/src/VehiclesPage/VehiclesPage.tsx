import Box from '@mui/material/Box';
import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

// Defining types in typescript for our vehicles
type Vehicle = {
    name: string;
    diameter: string;
    climate: string;
    terrain: string;
    population: string;
    url: string;
}

// Defining types in typescript for our starships
type Starship = {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    starship_class: string;
}

export default function VehiclesPage(){
    const [vehiclesDB, setVehiclesDB] = useState<Vehicle[]>([])
    const [starshipsDB, setStarshipsDB] = useState<Starship[]>([])
    // const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseV = await fetch('https://swapi.dev/api/vehicles')
                const responseS = await fetch('https://swapi.dev/api/starships')
                const resultV = await responseV.json();
                const resultS = await responseS.json();
                setVehiclesDB(resultV.results)
                setStarshipsDB(resultS.results)
            }
            catch (error) {
                navigate('/error')
            }
        } 
        fetchData()
    }, [navigate])
    console.log(vehiclesDB)
    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', fontSize: '3rem', flexDirection: 'column', mt: 0}}>
            {
                vehiclesDB.length === 0 ?
                <Typography component="h1" variant='h1' sx={{ mt: 3, mb: 3 }}>Loading...</Typography>:
                // Adding an index so it has a numbered key
                vehiclesDB.map((vehicle, index) => (
                    <React.Fragment key={index}>
                    <Typography component="h3" variant='h3' sx={{mb: 2}}>{vehicle.name}</Typography>
                    </React.Fragment>
            ))}
        </Box>
    )
}
