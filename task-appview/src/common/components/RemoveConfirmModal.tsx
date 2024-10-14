
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';

type RemoveConfirmModalProps = {
    handleCancelModal: React.MouseEventHandler<HTMLButtonElement>;
    handleDeleteModal: React.MouseEventHandler<HTMLButtonElement>;
};

export default function RemoveConfirmModal({ handleCancelModal, handleDeleteModal }: RemoveConfirmModalProps) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const editModalTopPer: string = isMobile ? '10%' : '50%';
    const editModalLeftPer: string = isMobile ? '10%' : '50%';
    const editModalWidthPer: string = isMobile ? '80%' : '40%';
    const editModalHeightPer: string = isMobile ? '20%' : '15%';
    const editModalTransformPer: string = isMobile ? 'translate(0%, 0%)' : 'translate(-50%, -50%)';

    return (
        <Box
            sx={{
                position: 'absolute' as 'absolute',
                top: editModalTopPer,
                left: editModalLeftPer,
                transform: editModalTransformPer,
                padding: "10px",
                borderRadius: "10px",
                margin: "auto",
                width: editModalWidthPer,
                height: editModalHeightPer,
                bgcolor: "white",
            }}
        >
            <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                <Grid size={12} >
                    <p>本当に削除しますか？</p>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                    <Grid>
                        <Button sx={{ width: '150px' }} variant="outlined" onClick={handleCancelModal}>キャンセル</Button>
                    </Grid>
                    <Grid>
                        <Button sx={{ width: '150px' }} variant="outlined" onClick={handleDeleteModal} color="error" startIcon={<DeleteIcon />}>削除</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Box >

    );
}
