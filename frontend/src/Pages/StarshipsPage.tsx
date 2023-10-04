import Box from '@mui/material/Box';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

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
    url: string;
}

export default function VehiclesPage(){
    const [starshipsDB, setStarshipsDB] = useState<Starship[]>([])
    const [isLoading, setIsloading] = useState<boolean>(true)
    const navigate = useNavigate()
    useEffect(()=>{
        document.title = 'Starships'
    },[])
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    useEffect(() => {
        const controller = new AbortController 
        const signal = controller.signal
        const fetchData = async () => {
            let nextURL: string | null =  'https://swapi.dev/api/starships'
            let allData: Starship[] = []
            try {
                while (nextURL){
                    const response = await fetch(nextURL, { signal })
                    const result = await response.json();
                    // If the response from the server was not between 200-299 this is error is thr
                    if (!response.ok){
                        throw new Error('Connection Error!')
                    }
                    allData = [...allData, ...result.results]
                    nextURL = result.next ? result.next : null;
                }
                setStarshipsDB(allData)
                setIsloading(false)
            }
            catch (error: unknown) {
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
    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundColor: '#112333'}}>Starships</Typography>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center',height: '55vh', mt: '10'}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                // Adding an index so it has a numbered key
                starshipsDB.map((starship, index) => (
                    <div key={starship.url} style={{textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
                        backgroundColor: '#112333'}}>
                        <Typography component="h3" variant='h3' sx={{mb: 2}}>{starship.name}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Model: {starship.model}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Manufacturer: {starship.manufacturer}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Cost: {starship.cost_in_credits}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Length: {starship.length}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Max Atmosphering Speed: {starship.max_atmosphering_speed}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Crew: {starship.crew}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Passengers: {starship.passengers}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Cargo Capacity: {starship.cargo_capacity}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Consumables: {starship.consumables}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Hypderdrive Rating: {starship.hyperdrive_rating}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2}}>Starship Class: {starship.starship_class}</Typography>
                        <Button variant="contained" href={`/starships/${index + 2}`}>View More</Button>
                    </div>
            ))}
        </Box>
    )
}