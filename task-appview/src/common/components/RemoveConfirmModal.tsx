
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

type RemoveConfirmModalProps = {
    handleCancelModal: React.MouseEventHandler<HTMLButtonElement>;
    handleDeleteModal: React.MouseEventHandler<HTMLButtonElement>;
};

export default function RemoveConfirmModal({ handleCancelModal, handleDeleteModal }: RemoveConfirmModalProps) {

    return (
        <Box
            sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: "10px",
                borderRadius: "10px",
                margin: "auto",
                width: "20%",
                height: "15%",
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
