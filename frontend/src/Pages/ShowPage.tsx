import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
    const [item, setItem] = useState<Items[]>([])
    const [isLoading, setIsloading] = useState<boolean>(true)
    const navigate = useNavigate()
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
                const response = await fetch('https://swapi.dev/api/planets/1', { signal });
                const result = await response.json();
                
                // If the response from the server was not between 200-299 this is error is thrown
                if (!response.ok) {
                    throw new Error('Connection Error!');
                }
                    setItem(result);
                    setIsloading(false);
            } catch (error) {
                navigate('/error', { state: { error } });
            }
        };
        fetchData();
        // Using the cleanup function from react to send an abort to the signal 
        return () => {
            controller.abort();
        };
    }, [navigate]); // Dependency array for the useEffect hook
    
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    return(
        <h1>hello</h1>
    )
}
