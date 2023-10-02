import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useEffect} from 'react'

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
            <Grid xs={8} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
            <Grid xs={8} columns={16}>
                <Item>
                <Typography component={'h1'} variant='h1' sx={{fontSize: '8rem'}}>SWAPI PROJECT</Typography>
                </Item>
            </Grid>
            <Grid xs={8} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
            <Grid xs={8} columns={16}>
                <Item>
                    {/* Fix the arrow so its more centered */}
                    <Typography component={'h6'} variant='h6' sx={{fontSize: '2rem'}}>Check out one of the sections below <ArrowDownwardIcon/></Typography>
                    <Button variant="text" href='/characters' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700'}}>Characters</Button>
                    <Button variant="text" href='/vehicles' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700', mr: 1, ml: 2}}>Vehicles</Button>
                    <Button variant="text" href='starships' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700', mr: 2, ml: 1}}>Starships</Button>
                    <Button variant="text" href='planets' sx={{color: 'white', fontSize: '1.25rem', fontWeight: '700'}}>Planets</Button>
                </Item>
            </Grid>
            <Grid xs={8} columns={16} sx={{margin: 0}}>
                <Item>
                </Item>
            </Grid>
        </Grid>
    )
}