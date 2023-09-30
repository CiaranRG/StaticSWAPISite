import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

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
    const navigate = useNavigate()
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            let nextURL = 'https://swapi.dev/api/people'
            let allData: Character[] = []
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
                setCharactersDB(allData)
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
            {
                charactersDB.length === 0 ?
                <Typography component="h1" variant='h1' sx={{ mt: 0, mb: 3 }}>Loading...</Typography>:
                charactersDB.map((character) => (
                    <div key={character.url} style={{textAlign: 'center', border: '4px solid black', marginBottom: '30px', padding: '20px', borderRadius: '10px'}}>
                    <Typography component="h3" variant='h3' sx={{mb: 2, textTransform: 'capitalize'}}>{character.name}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Height: {character.height}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Hair Color: {character.hair_color}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Skin Color: {character.skin_color}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Eye Color: {character.eye_color}</Typography>
                    <Typography component="h6" variant='h6' sx={{mb: 2, textTransform: 'capitalize'}}>Birth Year: {character.birth_year}</Typography>
                    <Button variant="contained">View More</Button>
                    </div>
            ))}
        </Box>
    )
}



