import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { IUserService } from "../../../infrastructures/IUserService";

type UserDeleteProps = {
    userService: IUserService;
};

export default function UserDelete({ userService }: UserDeleteProps) {

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
    function handleClickExeButton(): void {
        setOpenDeleteConfirmDialog(true);
    }

    function handleCancelDeleteConfirmDialog(): void {
        setOpenDeleteConfirmDialog(false);
    }

    async function handleDeleteConfirmDialog() {
        try {
            const fetchUserInfo = await userService.fetchAuthUserInfo();
            await userService.deleteUser(fetchUserInfo.User.id);
        } catch (error) {
            console.error('アカウント削除に失敗しました', error);
            throw error;
        }

        setOpenDeleteConfirmDialog(false);
        setOpenSuccessDialog(true);
        setTimeout(() => {
            logout();
        }, 3000);
    }

    function handleSuccessDialogClose(): void {
        // nothing to do
    }

    function logout() {
        sessionStorage.removeItem('authToken');
        window.location.reload();
    }

    return (<div>
        <Stack className="register-container" direction="column" justifyContent="space-between">
            <Card className="register-card" variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    {""}
                </Typography>
                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <Button
                        fullWidth
                        color={"error"}
                        variant="contained"
                        onClick={handleClickExeButton}
                    >
                        {"ユーザーアカウント削除"}
                    </Button>
                </Box>
            </Card>
        </Stack>
        <Dialog
            open={openDeleteConfirmDialog}
            onClose={handleCancelDeleteConfirmDialog}
        >
            <DialogTitle>{"アカウントを削除しますか？"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleDeleteConfirmDialog} color="error">
                    OK
                </Button>
                <Button onClick={handleCancelDeleteConfirmDialog} color="primary">
                    キャンセル
                </Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openSuccessDialog}
            onClose={handleSuccessDialogClose}
        >
            <DialogTitle>{"アカウント削除完了(自動遷移)"}</DialogTitle>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="secondary" />
            </DialogActions>
        </Dialog>
    </div>

    );
}