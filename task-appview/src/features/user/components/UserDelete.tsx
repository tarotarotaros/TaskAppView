import { Box, Button, Card, Dialog, DialogActions, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { IUserService } from "../../../infrastructures/IUserService";

type UserDeleteProps = {
    userService: IUserService;
};

export default function UserDelete({ userService }: UserDeleteProps) {

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);


    function handleClickExeButton(): void {
        throw new Error("Function not implemented.");
    }

    function handleSuccessDialogClose(): void {
        throw new Error("Function not implemented.");
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
            open={openSuccessDialog}
            onClose={handleSuccessDialogClose}
        >
            <DialogTitle>{"変更完了"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleSuccessDialogClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </div>

    );
}