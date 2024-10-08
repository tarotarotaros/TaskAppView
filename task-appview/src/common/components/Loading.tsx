import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2';

interface LoadingProps {
    size?: 'big' | 'small'; // sizeはオプションにします
    marginRight?: number;
    color?: | "secondary" | "info" | "primary";
}

export default function Loading({ size = 'big', marginRight = 0, color = 'primary' }: LoadingProps) {
    // サイズを条件に応じて設定。デフォルトは 'big'
    const progressSize = size === 'big' ? '30px' : '15px';
    const fontSize = size === 'big' ? '2rem' : '1rem';

    return (
        <div>
            <Grid container size={12} justifyContent="center" alignItems="center" spacing={2} sx={{ marginRight: marginRight }}>
                <Grid>
                    <CircularProgress size={progressSize} color={color} />
                </Grid>
                <Grid>
                    <h1 style={{ fontSize }}>{`Loading...`}</h1>
                </Grid>
            </Grid>
        </div>
    );
}