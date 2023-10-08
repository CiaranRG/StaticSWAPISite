import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';

// Defining types in typescript for our characters
type Character = {
    name: string;
    height: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    homeworld: string;
    url: string;
}

export default function CharactersPage(){
    const [charactersDB, setCharactersDB] = useState<Character[]>([])
    const [isLoading, setIsloading] = useState<boolean>(true)
    const navigate = useNavigate()
    useEffect(()=>{
        document.title = 'Characters'
    },[])
    useEffect(() => {
        console.log("Effect Running")
        const controller = new AbortController()
        const signal = controller.signal
        const fetchData = async () => {
            // Letting the variable be of type string or null
            let nextURL: string | null = 'https://swapi.dev/api/people'
            let allData: Character[] = []
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
                    setCharactersDB(allData)
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
            console.log("Component Unmounted")
        }
    }, [navigate])
    return(
            // Turn this whole section into a grid layout to better style things
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundImage: "URL('https://images.unsplash.com/photo-1513628253939-010e64ac66cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')",
            backgroundSize: 'cover',
            fontSize: {xs: '2.3rem', sm: '4rem', md: '5rem', lg: '6rem'},
            }}>CHARACTERS</Typography>
            <Grid container spacing={0}>
            {
                isLoading ?
                <Box sx={{display: 'flex', alignItems: 'center',height: '55vh', mt: '10'}}>
                    <CircularProgress size={'4rem'}/>
                </Box>:
                charactersDB.map((character, index) => (
                    <Grid xs={12} sm={12} md={6} lg={4} xl={3} sx={{display: 'flex', justifyContent: 'center', mt: {xs: '10px', sm: '20px', md: '30px'}}}>
                        <Box key={character.url} 
                        sx={{textAlign: 'center', border: '2px solid white', marginBottom: '50px', padding: '20px', borderRadius: '10px', color: 'white', 
                        backgroundImage: "URL('https://images.unsplash.com/photo-1513628253939-010e64ac66cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80')",
                        backgroundSize: 'cover',
                        width: {xs: '290px', sm: '450px', md: '370px', lg: '340px',xl: '360px'}, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography component="h3" variant='h3' sx={{mb: 2, textTransform: 'capitalize'}}>{character.name}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Height: {character.height}</Typography>
                        <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Birth Year: {character.birth_year}</Typography>
                        <Button variant="contained" href={`/characters/${index + 1}`}>View More</Button>
                        </Box>
                    </Grid>
            ))}
            </Grid>
        </Box>
    )
}



