import Box from '@mui/material/Box';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

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
        let isMounted = true
        const fetchData = async () => {
            let nextURL = 'https://swapi.dev/api/vehicles'
            let allData: Vehicle[] = []
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
                setVehiclesDB(allData)
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
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundColor: '#112333'}}>Vehicles</Typography>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center',height: '55vh', mt: '10'}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                vehiclesDB.map((vehicle) => (
                    <div key={vehicle.url} style={{textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
                    backgroundColor: '#112333'}}>
                        <Typography component="h3" variant='h3' sx={{mb: 2}}>{vehicle.name}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Model: {vehicle.model}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Manufacturer: {vehicle.manufacturer}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Cost: {vehicle.cost_in_credits}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Length: {vehicle.length}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Crew: {vehicle.crew}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Passengers: {vehicle.passengers}</Typography>
                        <Button variant="contained">View More</Button>
                    </div>
            ))}
        </Box>
    )
}