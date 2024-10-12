import { Box, Card, CssBaseline, Dialog, DialogActions, DialogTitle, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import EMailForm from '../../../common/components/EMailForm';
import PasswordForm from '../../../common/components/PasswordForm';
import { User } from '../../../types/User';
import '../styles/SignupStyle.css';

type UserInfoInputProps = {
    functionKey: string;
    functionDisplayTitleText: string;//アカウント登録
    functionSusccessDialogTitleText: string;//ユーザー登録完了（自動ログイン）
    functionExeButtonText: string;//登録
    onClickExeButton: (user: User) => void;
    settingName?: string;
    settingEmail?: string;
    settingPassword?: string;
};

export default function UserInfoInput({ functionKey, functionDisplayTitleText, functionSusccessDialogTitleText, functionExeButtonText, onClickExeButton,
    settingName = "", settingEmail = "", settingPassword = "" }: UserInfoInputProps) {

    const emailKey = functionKey + "email";
    const passwordKey = functionKey + "password";

    const [name, setName] = useState(settingName);
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const [email, setEmail] = useState(settingEmail);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

    const [password, setPassword] = useState(settingPassword);
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    useEffect(() => {
        setName(settingName);
        setEmail(settingEmail);
        setPassword(settingPassword);
    }, [settingName, settingEmail, settingPassword]);

    const validateInputs = () => {
        const name = document.getElementById('name') as HTMLInputElement;
        const email = document.getElementById(emailKey) as HTMLInputElement;
        const password = document.getElementById(passwordKey) as HTMLInputElement;

        let isValid = true;

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('ユーザー名は必須です。');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('有効なEメールアドレスを入力してください。');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('パスワードは6文字以上でなければなりません。');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    // ユーザー登録＋ログイン処理
    const handleClickExeButton = () => {

        let isOk = validateInputs();
        if (!isOk) return;

        try {
            const inputUserData: User = {
                name: name,
                email: email,
                password: password,
            }
            onClickExeButton(inputUserData)
            setOpenSuccessDialog(true);
        } catch (error) {
            console.error('ユーザー登録処理でエラーが発生しました:', error);
        }
    };

    //ダイアログクローズ処理
    const handleSuccessDialogClose = () => {
        setOpenSuccessDialog(false);
        window.location.reload();
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
                        {functionDisplayTitleText}
                    </Typography>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">ユーザー名</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name}
                                value={name}
                                id="name"
                                placeholder="username123"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <EMailForm
                            keyText={emailKey}
                            email={email}
                            emailError={emailError}
                            errorMessage={emailErrorMessage}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordForm
                            keyText={passwordKey}
                            password={password}
                            passwordError={passwordError}
                            errorMessage={passwordErrorMessage}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClickExeButton}
                        >
                            {functionExeButtonText}
                        </Button>
                    </Box>
                </Card>
            </Stack>

            <Dialog
                open={openSuccessDialog}
                onClose={handleSuccessDialogClose}
            >
                <DialogTitle>{functionSusccessDialogTitleText}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleSuccessDialogClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}