import Box from '@mui/material/Box';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

// Defining types in typescript for our vehicles
type Vehicle = {
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
    vehicle_class: string;
    url: string;
}

export default function VehiclesPage(){
    const [vehiclesDB, setVehiclesDB] = useState<Vehicle[]>([])
    const [isLoading, setIsloading] = useState<boolean>(true)
    // const [starshipsDB, setStarshipsDB] = useState<Starship[]>([])
    const navigate = useNavigate()
    useEffect(()=>{
        document.title = 'Vehicles'
    },[])
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    useEffect(() => {
        const controller = new AbortController 
        const signal = controller.signal
        const fetchData = async () => {
            let nextURL: string | null =  'https://swapi.dev/api/vehicles'
            let allData: Vehicle[] = []
            try {
                while (nextURL){
                    const response = await fetch(nextURL, {signal})
                    const result = await response.json();
                    // If the response from the server was not between 200-299 this is error is thr
                    if (!response.ok){
                        throw new Error('Connection Error!')
                    }
                    allData = [...allData, ...result.results]
                    nextURL = result.next ? result.next : null;
                }
                setVehiclesDB(allData)
                setIsloading(false)
            }
            catch (error: unknown) {
                console.log
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    navigate('/error', {state: { error }})
                }
            }
        } 
        fetchData()
        return () => {
            controller.abort()
        }
    }, [navigate])
    // Add search functionality for each page
    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundImage: "URL('https://images.unsplash.com/photo-1513628253939-010e64ac66cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: 'cover',
            fontSize: {xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem'},
            }}>VEHICLES</Typography>
            <Grid container spacing={0}>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center', height: '55vh', mt: '10'}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                vehiclesDB.map((vehicle, index) => (
                    <Grid xs={12} sm={6} md={4} lg={3} sx={{display: 'flex', justifyContent: 'center', mt: {xs: '10px', sm: '20px', md: '30px'}}}>
                        <Box key={vehicle.url} 
                        sx={{textAlign: 'center', border: '2px solid white', marginBottom: '50px', padding: '20px', borderRadius: '10px', color: 'white', 
                        backgroundImage: "URL('https://images.unsplash.com/photo-1513628253939-010e64ac66cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')",
                        backgroundSize: 'cover',
                        width: {xs: '290px', lg: '290px',xl: '360px'}, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography component="h4" variant='h4' sx={{mb: 2, textTransform: 'capitalize'}}>{vehicle.name}</Typography>
                            <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Model: {vehicle.model}</Typography>
                            <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Manufacturer: {vehicle.manufacturer}</Typography>
                            <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Passengers: {vehicle.passengers}</Typography>
                            <Link to={`/vehicles/${index + 4}`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" href={`/vehicles/${index + 4}`}>View More</Button>
                            </Link>
                        </Box>
                    </Grid>
            ))}
            </Grid>
        </Box>
    )
}