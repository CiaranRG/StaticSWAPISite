import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

type ErrorType = {
    message: string
    code: string
}

export default function ErrorPage({error}: { error: ErrorType }){
    const location = useLocation()
    const finalError = error || location.state.error
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh', fontSize: '3rem', color: 'white'}}>
            <h1>{finalError.code} - {finalError.message}</h1>
        </Box>
    )
}