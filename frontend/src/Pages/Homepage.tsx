import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#112333',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
  }));

export default function HomePage(){
    useEffect(()=>{
        document.title = 'Home'
    },[])
    return(
        <Grid container spacing={2} justifyContent={'center'} alignContent={'center'} minHeight={'92vh'} maxHeight={'92vh'} flexDirection={'column'} margin={0}>
            <Grid xs={10} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
            <Grid xs={10} columns={16}>
                <Item>
                <Typography component={'h1'} variant='h1' sx={{fontSize: { xs: '2.5rem', sm:'4rem', md: '8rem', lg: '6rem', xl: '7rem'}}}>
                    SWAPI DATABASE</Typography>
                </Item>
            </Grid>
            <Grid xs={10} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
            <Grid xs={10} columns={16}>
                <Item sx={{display: {xs: 'flex', md: 'block'}, flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
                    <Link to="/characters" style={{ textDecoration: 'none' }}>
                        <Button variant="text" href='/characters' sx={{color: 'white', fontSize: { xs: '1.8rem', sm: '2rem', md: '3rem', lg: '2rem', xl: '2rem'}}}>
                            Characters</Button>
                    </Link>
                    <Link to="/vehicles" style={{ textDecoration: 'none' }}>
                        <Button variant="text" href='/vehicles' sx={{color: 'white', fontSize: { xs: '1.8rem', sm: '2rem', md: '3rem', lg: '2rem', xl: '2rem'}, mr: {md: 2, sm: 0}, 
                            ml: {md: 2, sm: 0}}}>
                            Vehicles</Button>
                    </Link>
                    <Link to="/starships" style={{ textDecoration: 'none' }}>
                        <Button variant="text" href='starships' sx={{color: 'white', fontSize: { xs: '1.8rem', sm: '2rem', md: '3rem', lg: '2rem', xl: '2rem'}, 
                            mr: {md: 2, sm: 0}, ml: {md: 1, sm: 0}}}>
                            Starships</Button>
                    </Link>
                    <Link to="/planets" style={{ textDecoration: 'none' }}>
                        <Button variant="text" href='planets' sx={{color: 'white', fontSize: { xs: '1.8rem', sm: '2rem', md: '3rem', lg: '2rem', xl: '2rem'}}}>
                            Planets</Button>
                    </Link>
                </Item>
            </Grid>
            <Grid xs={10} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
        </Grid>
    )
}