import { Box, Button, Card, CssBaseline, Dialog, DialogActions, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import PasswordForm from "../../../common/components/PasswordForm";
import { IUserService } from "../../../infrastructures/IUserService";

type PasswordChangeProps = {
    userService: IUserService;
};

export default function PasswordChange({ userService }: PasswordChangeProps) {

    const CURRENT_PASSWORD_KEY: string = "currentPassword";
    const NEW_PASSWORD_KEY: string = "newPassword";
    const NEW_CONFIRM_PASSWORD_KEY: string = "newConfirmPassword";
    const CURRENT_PASSWORD_TITLE: string = "現在のパスワード";
    const NEW_PASSWORD_TITLE: string = "新しいパスワード";
    const NEW_PASSWORD_CONFIRM_TITLE: string = "新しいパスワード（確認）";

    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');

    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [newConfirmPasswordError, setNewConfirmPasswordError] = useState(false);
    const [newConfirmPasswordErrorMessage, setNewConfirmPasswordErrorMessage] = useState('');

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    function handleSuccessDialogClose() {
        setOpenSuccessDialog(false);
    }

    async function handleClickExeButton() {
        let isOk = validateInputs();
        if (!isOk) return;

        try {
            const userInfo = await userService.fetchAuthUserInfo();
            await userService.updatePassword(userInfo.id, currentPassword, newPassword, newConfirmPassword);
        } catch (error) {
            console.error('パスワードの変更に失敗しました', error);
            throw error;
        }

        setOpenSuccessDialog(true);
    }

    function validateInputs(): boolean {

        const fields: {
            element: HTMLInputElement,
            setError: React.Dispatch<React.SetStateAction<boolean>>,
            setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
            name: string
        }[] = [
                {
                    element: document.getElementById(CURRENT_PASSWORD_KEY) as HTMLInputElement,
                    setError: setCurrentPasswordError,
                    setErrorMessage: setCurrentPasswordErrorMessage,
                    name: '現在のパスワード'
                },
                {
                    element: document.getElementById(NEW_PASSWORD_KEY) as HTMLInputElement,
                    setError: setNewPasswordError,
                    setErrorMessage: setNewPasswordErrorMessage,
                    name: '新しいパスワード'
                },
                {
                    element: document.getElementById(NEW_CONFIRM_PASSWORD_KEY) as HTMLInputElement,
                    setError: setNewConfirmPasswordError,
                    setErrorMessage: setNewConfirmPasswordErrorMessage,
                    name: '確認用パスワード'
                },
            ];

        let isValid = true;

        fields.forEach(field => {
            if (!field.element.value) {
                field.setError(true);
                field.setErrorMessage(`${field.name}は必須です。`);
                isValid = false;
            } else if (field.element.value.length < 6) {
                field.setError(true);
                field.setErrorMessage(`${field.name}は6文字以上でなければなりません。`);
                isValid = false;
            } else {
                field.setError(false);
                field.setErrorMessage('');
            }

            if (fields[1].element.value !== fields[2].element.value) {
                fields[2].setError(true);
                fields[2].setErrorMessage(`${fields[1].name}と${fields[2].name}は同じでなければなりません。`);
                isValid = false;
            }
        });


        return isValid;
    };



    return (


        <div>
            <CssBaseline enableColorScheme />
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

                        <PasswordForm
                            title={CURRENT_PASSWORD_TITLE}
                            keyText={CURRENT_PASSWORD_KEY}
                            password={currentPassword}
                            passwordError={currentPasswordError}
                            errorMessage={currentPasswordErrorMessage}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <PasswordForm
                            title={NEW_PASSWORD_TITLE}
                            keyText={NEW_PASSWORD_KEY}
                            password={newPassword}
                            passwordError={newPasswordError}
                            errorMessage={newPasswordErrorMessage}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <PasswordForm
                            title={NEW_PASSWORD_CONFIRM_TITLE}
                            keyText={NEW_CONFIRM_PASSWORD_KEY}
                            password={newConfirmPassword}
                            passwordError={newConfirmPasswordError}
                            errorMessage={newConfirmPasswordErrorMessage}
                            onChange={(e) => setNewConfirmPassword(e.target.value)}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClickExeButton}
                        >
                            {"変更"}
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