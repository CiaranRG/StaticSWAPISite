import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

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
    id: string;
}

export default function CharactersPage(){
    const [charactersDB, setCharactersDB] = useState<Character[]>([])
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsloading] = useState<boolean>(true)
    const navigate = useNavigate()
    useEffect(()=>{
        document.title = 'Characters'
    },[])
    const handleSearch = ((evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(evt.target.value)
    })
    useEffect(() => {
        console.log("Effect Running")
        const controller = new AbortController()
        const signal = controller.signal
        function extractIdFromUrl(url: string): string {
            const splitUrl = url.split('/');
            // Assuming the ID is always the second to last element in the array
            return splitUrl[splitUrl.length - 2];
        }
        const fetchData = async () => {
            // Letting the variable be of type string or null
            let nextURL: string | null = 'https://swapi.dev/api/people'
            let allData: Character[] = []
            try {
                while (nextURL){
                    const response: Response = await fetch(nextURL, {signal})
                    const result = await response.json();
                    // If the response from the server was not between 200-299 this is error is thr
                    if (!response.ok){
                        throw new Error('Connection Error!')
                    }
                    allData = [...allData, ...result.results.map((character: Character) => ({
                        ...character,
                        id: extractIdFromUrl(character.url)
                    }))]
                    nextURL = result.next ? result.next : null;
                }
                    setCharactersDB(allData)
                    setFilteredCharacters(allData)
                    console.log(filteredCharacters)
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

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCharacters(charactersDB);
        } else {
            const newFilteredArr = charactersDB.filter(vehicle =>
                vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCharacters(newFilteredArr);
        }
    }, [searchTerm, charactersDB]);
    return(
            // Turn this whole section into a grid layout to better style things
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexDirection: 'column', mt: 3}}>
            <Typography component="h1" variant='h1' sx={{mb: 4, textAlign: 'center', border: '2px solid white', marginBottom: '30px', padding: '20px', borderRadius: '10px', color: 'white', 
            backgroundColor: '#112333',
            backgroundSize: 'cover',
            fontSize: {xs: '2.1rem', sm: '5rem', md: '6rem'},
            }}>CHARACTERS</Typography>
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
                filteredCharacters.map((character) => (
                    <Grid key={character.url} xs={12} sx={{display: 'flex', justifyContent: 'center', mt: {xs: '10px', sm: '20px', md: '30px'}}}>
                        <Box  
                        sx={{textAlign: 'center', border: '2px solid white', marginBottom: '50px', padding: '20px', borderRadius: '10px', color: 'white', 
                        backgroundColor: '#112333',
                        backgroundSize: 'cover', fontWeight: '700',
                        width: {xs: '270px', sm:'500px', md: '600px', lg: '700px',xl: '800px'}, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography component="h2" variant='h2' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '2rem', xl: '3rem'}, fontWeight: '700'}}>{character.name}</Typography>
                        <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Height: {character.height}</Typography>
                        <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Birth Year: {character.birth_year}</Typography>
                        <Typography component="h5" variant='h5' sx={{mb: 2, textTransform: 'capitalize', fontSize: { xs: '1rem', xl: '1.5rem'}, fontWeight: '700'}}>Skin Color: {character.skin_color}</Typography>
                        <Link to={`/characters/${character.id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" href={`/characters/${character.id}`}>View More</Button>
                        </Link>
                        </Box>
                    </Grid>
            ))}
            </Grid>
        </Box>
    )
}



