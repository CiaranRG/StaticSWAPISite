import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


type Items = {
    name: string;
    url: string;
    mass?: string;
    gender?: string;
    diameter?: string;
    climate?: string;
    terrain?: string;
    population?: string;
    height?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    homeworld?: string;
    model?: string;
    manufacturer?: string;
    cost_in_credits?: string;
    length?: string;
    max_atmosphering_speed?: string;
    crew?: string;
    passengers?: string;
    cargo_capacity?: string;
    consumables?: string;
    hyperdrive_rating?: string;
    starship_class?: string;
    vehicle_class?: string;
    MGLT?: string;
    rotation_period?: string;
    orbital_period?: string;
    gravity?: string;
    surface_water?: string;
}

export default function ShowPage(){
    const [item, setItem] = useState<Items>({name: '', url: ''})
    const [isLoading, setIsloading] = useState<boolean>(true)
    // Grabbing the ids from the url
    const { vehicleId, characterId, starshipId, planetId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    // Setting a url variable and then changing it based on what page we are trying to show
    let urlPath: string = ''
    if (location.pathname.includes('vehicles')) {
        console.log("Vehicles")
        urlPath = `https://swapi.dev/api/vehicles/${vehicleId}`
        console.log(urlPath)
    } else if (location.pathname.includes('character')) {
        urlPath = `https://swapi.dev/api/people/${characterId}`
    } else if (location.pathname.includes('planets')) {
        urlPath = `https://swapi.dev/api/planets/${planetId}`
    } else if (location.pathname.includes('starships')) {
        urlPath = `https://swapi.dev/api/starships/${starshipId}`
    }
    // Used to change the title to either be loading or the name of the item
    useEffect(() => {
        if (isLoading) {
            document.title = 'Loading...';
        } else {
            document.title = item.name;
        }
    }, [isLoading, item.name]);
    useEffect(() => {
        // Creating an abortController to pass to the fetch call 
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                const response = await fetch(urlPath, { signal });
                const result = await response.json();
                // If the response from the server was not between 200-299 this is error is thrown
                if (!response.ok) {
                    throw new Error('Connection Error!');
                } else {
                    setItem(result);
                    setIsloading(false);
                }
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    navigate('/error', {state: { error }})
                }
            }
        };
        fetchData();
        // Using the cleanup function from react to send an abort to the signal 
        return () => {
            controller.abort();
        };
    }, [navigate, urlPath]); // Dependency array for the useEffect hook
    
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundImage: "URL('https://images.unsplash.com/photo-1513628253939-010e64ac66cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: 'cover',
            fontSize: {xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem', xl: '6rem'}
            }}>{isLoading ? 'Loading...' : item.name}</Typography>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center', height: '55vh', mt: '10',}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                (
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', 
                    borderRadius: '10px', color: 'white', 
                    backgroundImage: "URL('https://images.unsplash.com/photo-1513628253939-010e64ac66cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')",
                    backgroundSize: 'cover',
                    width: {xs: '300px', sm: '500px', md: '800px', lg: '1000px', xl: '1200px'},
                    }}>
                        {item.height && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Height: {item.height}cm</Typography>
                        }
                        {item.mass && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Weight: {item.mass}kg</Typography>
                        }
                        {item.hair_color && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Hair Color: {item.hair_color}</Typography>
                        }
                        {item.skin_color && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Skin Color: {item.skin_color}</Typography>
                        }
                        {item.eye_color && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Eye Color: {item.eye_color}</Typography>
                        }
                        {item.birth_year && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Birth Year: {item.birth_year}</Typography>   
                        }
                        {item.gender && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Gender: {item.gender}</Typography>
                        }
                        {item.model && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Model: {item.model}</Typography>
                        }
                        {item.manufacturer && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Manufacturer: {item.manufacturer}</Typography>
                        }
                        {item.cost_in_credits && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Cost In Credits: {item.cost_in_credits}</Typography>
                        }
                        {item.length && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Length: {item.length} meters</Typography>
                        }
                        {item.max_atmosphering_speed && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Max Atmosphering Speed: {item.max_atmosphering_speed}</Typography>
                        }
                        {item.crew && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Crew: {item.crew}</Typography>
                        }
                        {item.passengers && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Passengers: {item.passengers}</Typography>
                        }
                        {item.cargo_capacity && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Cargo Capacity: {item.cargo_capacity}lbs</Typography>
                        }
                        {item.consumables && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Consumables: {item.consumables}</Typography>
                        }
                        {item.hyperdrive_rating && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>HyperDrive Rating: {item.hyperdrive_rating}</Typography>
                        }
                        {item.MGLT && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>MGLT: {item.MGLT}</Typography>
                        }
                        {item.vehicle_class && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Vehicle Class: {item.vehicle_class}</Typography>
                        }
                        {item.starship_class && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Starship Class: {item.starship_class}</Typography>
                        }
                        {item.rotation_period && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Rotation Period: {item.rotation_period}</Typography>
                        }
                        {item.orbital_period && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Orbital Period: {item.orbital_period}</Typography>
                        }
                        {item.diameter && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Diameter: {item.diameter}</Typography>
                        }
                        {item.climate && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Climate: {item.climate}</Typography>
                        }
                        {item.gravity && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Gravity: {item.gravity}</Typography>
                        }
                        {item.terrain && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Terrain: {item.terrain}</Typography>
                        }
                        {item.surface_water && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Surface Water: {item.surface_water}</Typography>
                        }
                        {item.population && 
                            <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white', textTransform: 'capitalize', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}}}>Population: {item.population}</Typography>
                        }
                        <Button variant="text" href='/characters' sx={{color: 'white', fontSize: {xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem'}, fontWeight: '700'}}>Back</Button>
                    </Box>
                </Box>
                )
            }
        </Box>
    )
}