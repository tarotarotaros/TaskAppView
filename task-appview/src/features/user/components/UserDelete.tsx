import { Box, Button, Card, Dialog, DialogActions, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserService } from "../../../infrastructures/IUserService";

type UserDeleteProps = {
    userService: IUserService;
};

export default function UserDelete({ userService }: UserDeleteProps) {

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
    const navigate = useNavigate();

    function handleClickExeButton(): void {
        setOpenDeleteConfirmDialog(true);
    }

    function handleCancelDeleteConfirmDialog(): void {
        setOpenDeleteConfirmDialog(false);
    }

    async function handleDeleteConfirmDialog() {
        try {
            const userInfo = await userService.fetchAuthUserInfo();
            await userService.deleteUser(userInfo.id);
        } catch (error) {
            console.error('パスワードの変更に失敗しました', error);
            throw error;
        }

        setOpenDeleteConfirmDialog(false);
        setOpenSuccessDialog(true);
        logout();
    }

    function handleSuccessDialogClose(): void {
        setOpenSuccessDialog(false);
    }

    function logout() {
        sessionStorage.removeItem('authToken')
        navigate('/'); // 更新
    }

    return (<div>
        <Stack className="signup-container" direction="column" justifyContent="space-between">
            <Card className="signup-card" variant="outlined">
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
            <DialogTitle>{"アカウント削除完了"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleSuccessDialogClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </div>

    );
}