import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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
    // const navigate = useNavigate()
    // Create a while loop that constantly runs through getting the data until the next field of the returned data is null or some falsy value
    // useEffect(() => {
    //     const fetchData = async () => {
    //         let nextURL = 'https://swapi.dev/api/people'
    //         let allData: Character[] = [];
    //         try {
    //             while(nextURL){
    //                 const response = await fetch('https://swapi.dev/api/people')
    //                 const result = await response.json();
    //                 // If the response from the server was not between 200-299 this is error is thr
    //                 if (!response.ok){
    //                     throw new Error('Connection Error!')
    //                 }
    //                 allData = [...allData, result.results]
    //                 nextURL = result.next
    //                 console.log(allData)
    //             }
    //             setCharactersDB(allData)

    //         }
    //         catch (error) {
    //             // Passing the page a state object with an error key/value inside that state object so we can access with useLocation later
    //             navigate('/error', {state: { error }})
    //         }
    //     } 
    //     fetchData()
    // }, [navigate])

    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', fontSize: '3rem', flexDirection: 'column', mt: 70}}>
            {charactersDB.map((person) => (
                <>
                    <h3>{person.name}</h3>
                </>
            ))}
        </Box>
    )
}



