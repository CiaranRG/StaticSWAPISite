import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect } from 'react'

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
                <Typography component={'h1'} variant='h1' sx={{fontSize: { xs: '2rem', sm:'3.5rem', md: '5rem', lg: '6rem', xl: '9rem'}}}>
                    SWAPI PROJECT</Typography>
                </Item>
            </Grid>
            <Grid xs={10} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
            <Grid xs={10} columns={16}>
                <Item sx={{display: {xs: 'flex', md: 'block'}, flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
                    {/* Fix the arrow so its more centered */}
                    <Typography component={'h6'} variant='h6' sx={{fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.5rem', lg: '2rem', xl: '2rem'}}}>
                        Check out one of the sections below <ArrowDownwardIcon/></Typography>
                    <Button variant="text" href='/characters' sx={{color: 'white', fontSize: { xs: '1rem', sm: '1.8rem', md: '1.5rem', lg: '2rem', xl: '2rem'}}}>
                        Characters</Button>
                    <Button variant="text" href='/vehicles' sx={{color: 'white', fontSize: { xs: '1rem', sm: '1.8rem', md: '1.5rem', lg: '2rem', xl: '2rem'}, mr: {md: 2, sm: 0}, 
                        ml: {md: 2, sm: 0}}}>
                        Vehicles</Button>
                    <Button variant="text" href='starships' sx={{color: 'white', fontSize: { xs: '1rem', sm: '1.8rem', md: '1.5rem', lg: '2rem', xl: '2rem'}, 
                        mr: {md: 2, sm: 0}, ml: {md: 1, sm: 0}}}>
                        Starships</Button>
                    <Button variant="text" href='planets' sx={{color: 'white', fontSize: { xs: '1rem', sm: '1.8rem', md: '1.5rem', lg: '2rem', xl: '2rem'}}}>
                        Planets</Button>
                </Item>
            </Grid>
            <Grid xs={10} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
        </Grid>
    )
}