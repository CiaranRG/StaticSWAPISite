import Box from '@mui/material/Box';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

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
    id: string;
}

export default function StarshipsPage(){
    const [starshipsDB, setStarshipsDB] = useState<Starship[]>([])
    const [filteredStarships, setFilteredStarships] = useState<Starship[]>([])
    const [isLoading, setIsloading] = useState<boolean>(true)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        document.title = 'Starships'
    },[])
    const handleSearch = ((evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(evt.target.value)
    })
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    useEffect(() => {
        const controller = new AbortController 
        const signal = controller.signal
        function extractIdFromUrl(url: string): string {
            const splitUrl = url.split('/');
            // Assuming the ID is always the second to last element in the array
            return splitUrl[splitUrl.length - 2];
        }
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
                    allData = [...allData, ...result.results.map((starship: Starship) => ({
                        ...starship,
                        id: extractIdFromUrl(starship.url)
                    }))]
                    nextURL = result.next ? result.next : null;
                }
                setStarshipsDB(allData)
                setFilteredStarships(allData)
                setIsloading(false)
            }
            catch (error: unknown) {
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log('Fetch Aborted');
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

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredStarships(starshipsDB);
        } else {
            const newFilteredArr = starshipsDB.filter(vehicle =>
                vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStarships(newFilteredArr);
        }
    }, [searchTerm, starshipsDB]);

    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundColor: '#112333',
            backgroundSize: 'cover',
            fontSize: {xs: '3rem', sm: '5rem', md: '6rem'},
            }}>STARSHIPS</Typography>
            <TextField id="filled-basic" label="Search Here!" variant="filled" value={searchTerm} onChange={handleSearch}
            sx={{width: {xs: '200px', sm: '340px'}, border: '2px solid white', borderRadius: '10px',
            backgroundColor: '#112333',
            backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: {xs: '10px', sm: '0px'},
            '& label': {
                color: 'white', fontSize: {xs: '1rem', sm: '1.2rem'}
            },
            '& label.Mui-focused': {
                color: 'white',
            },
            '& .MuiInputBase-input': {
                color: 'white',
            },
            '& .MuiFilledInput-underline:after': {
                borderBottom: 'none', // removes underline on focus
            },
            '& .MuiFilledInput-underline:before': {
                borderBottom: 'none', // removes underline
            },
            '&:hover .MuiFilledInput-underline:before': {
                borderBottom: 'none', // removes underline on hover
            },
            }}
            />
            <Grid container spacing={0}>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center',height: '55vh', mt: '10'}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                // Adding an index so it has a numbered key
                filteredStarships.map((starship) => (
                    <Grid xs={12} key={starship.url} sx={{display: 'flex', justifyContent: 'center', mt: {xs: '10px', sm: '20px', md: '30px'}}}>
                        <Box 
                        sx={{textAlign: 'center', border: '2px solid white', marginBottom: '50px', padding: '20px', borderRadius: '10px', color: 'white', 
                        backgroundColor: '#112333',
                        backgroundSize: 'cover', fontWeight: '700',
                        width: {xs: '270px', sm:'500px', md: '600px'}, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography component="h2" variant='h2' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '2rem', xl: '3rem'}, fontWeight: '700'}}>{starship.name}</Typography>
                            <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Model: {starship.model}</Typography>
                            <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Crew: {starship.crew}</Typography>
                            <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Passengers: {starship.passengers}</Typography>
                            <Link to={`/starships/${starship.id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" href={`/starships/${starship.id}`}>View More</Button>
                        </Link>
                        </Box>
                    </Grid>
            ))}
            </Grid>
        </Box>
    )
}