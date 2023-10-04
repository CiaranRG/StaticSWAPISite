import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


type Items = {
    name: string;
    url: string;
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
    // useEffect(() => {
    //     if (isLoading) {
    //         document.title = 'Loading...';
    //     } else {
    //         document.title = item.name;
    //     }
    // }, [isLoading, item.name]);
    useEffect(() => {
        // Creating an abortController to pass to the fetch call 
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            console.log("Inside FetchData Function")
            console.log(urlPath)
            try {
                const response = await fetch(urlPath, { signal });
                const result = await response.json();
                console.log(result)
                // If the response from the server was not between 200-299 this is error is thrown
                if (!response.ok) {
                    throw new Error('Connection Error!');
                } else {
                    setItem(result);
                    console.log(item)
                    setIsloading(false);
                }
            } catch (error) {
                console.log(error);
                // navigate('/error', { state: { error } });
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
            backgroundColor: '#112333'}}>{item.name}</Typography>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center',height: '55vh', mt: '10'}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                (
                    <div>
                    {
                        item?.height ? (
                        // If item has a 'height' property
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white' }}>
                                Character
                                </Typography>
                                <Button variant="text" href='/characters' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700'}}>Back</Button>
                            </Box>
                        ) : item?.vehicle_class ? (
                        // If item has a 'vehicle_class' property
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white' }}>
                                Vehicle
                                </Typography>
                                <Button variant="text" href='/vehicles' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700'}}>Back</Button>
                            </Box>
                        ) : item?.starship_class ? (
                        // If item has a 'starship_class' property
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white' }}>
                                Starship
                                </Typography>
                                <Button variant="text" href='/starships' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700'}}>Back</Button>
                            </Box>
                        ) : item?.climate ? (
                        // If item has a 'climate' property
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white' }}>
                                Planet
                                </Typography>
                                <Button variant="text" href='/planets' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700'}}>Back</Button>
                            </Box>
                        ) : (
                        // Default content if neither property exists
                        <Typography component="h3" variant="h3" sx={{ mb: 2, color: 'white' }}>
                            Nothing to Display Here!
                        </Typography>
                        )
                    }
                  </div>
                )
            }
        </Box>
    )
}
