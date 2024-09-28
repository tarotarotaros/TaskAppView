import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2';

export default function Loading() {

    return (
        <div>
            <Grid container size={12} justifyContent="center" alignItems="center" spacing={2}>
                <Grid>
                    <CircularProgress size="30px" />
                </Grid>
                <Grid>
                    <h1 style={{ fontSize: '2rem' }}>Loading... </h1>
                </Grid>
            </Grid>
        </div>
    )
}