/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

// Defining types in typescript for our planets
type Planet = {
    name: string;
    diameter: string;
    climate: string;
    terrain: string;
    population: string;
    url: string;
    id: string;
}

export default function PlanetsPage(){
    const [planetsDB, setPlanetsDB] = useState<Planet[]>([])
    const [isLoading, setIsloading] = useState<boolean>(true)
    const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        document.title = 'Planets'
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
            let nextURL: string | null =  'https://swapi.tech/api/planets'
            let allData: Planet[] = []
            try {
                while (nextURL){
                    const response: Response = await fetch(nextURL, { signal })
                    const result = await response.json();
                    // If the response from the server was not between 200-299 this is error is thr
                    if (!response.ok){
                        throw new Error('Connection Error!')
                    }
                    allData = [...allData, ...result.results.map((planet: Planet) => ({
                        ...planet,
                        id: extractIdFromUrl(planet.url)
                    }))]
                    nextURL = result.next ? result.next : null;
                }
                // The page is breaking out of the while loop for some reason, have a better look at later
                setPlanetsDB(allData)
                setFilteredPlanets(allData)
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

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPlanets(planetsDB);
        } else {
            const newFilteredArr = planetsDB.filter(vehicle =>
                vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPlanets(newFilteredArr);
        }
    }, [searchTerm, planetsDB]);

    return(
       // Turn this whole section into a grid layout to better style things
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundColor: '#112333',
            backgroundSize: 'cover',
            fontSize: {xs: '3rem', sm: '5rem', md: '6rem'},
            }}>PLANETS</Typography>
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
                filteredPlanets.map((planet) => (
                    <Grid xs={12} key={planet.url}  sx={{display: 'flex', justifyContent: 'center', mt: {xs: '10px', sm: '20px', md: '30px'}}}>
                        <Box
                        sx={{textAlign: 'center', border: '2px solid white', marginBottom: '50px', padding: '20px', borderRadius: '10px', color: 'white', 
                        backgroundColor: '#112333',
                        backgroundSize: 'cover', fontWeight: '700',
                        width: {xs: '270px', sm:'500px', md: '600px', lg: '700px',xl: '800px'}, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography component="h2" variant='h2' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '2rem', xl: '3rem'}, fontWeight: '700'}}>{planet.name}</Typography>
                        <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Climate: {planet.climate}</Typography>
                        <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Terrain: {planet.terrain}</Typography>
                        <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Population: {planet.population}</Typography>
                        <Link to={`/planets/${planet.id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" href={`/planets/${planet.id}`}>View More</Button>
                        </Link>
                        </Box>
                    </Grid>
            ))}
            </Grid>
        </Box>
    )
}