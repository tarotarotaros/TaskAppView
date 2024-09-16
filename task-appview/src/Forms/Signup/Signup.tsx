import { Card, Dialog, DialogActions, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../infrastructures/signin';
import EMailForm from './EMailForm';
import PasswordForm from './PasswordForm';
import './SignupStyle.css';

export default function SignUp() {

    const [name, setName] = useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const navigate = useNavigate();

    const validateInputs = () => {
        const name = document.getElementById('name') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

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
    const handleRegister = async () => {

        let isOk = validateInputs();
        if (!isOk) return;

        try {
            const signupUserData = {
                name: name,
                email: email,
                password: password,
            }
            await signup(signupUserData);
            setOpenSuccessDialog(true);
        } catch (error) {
            console.error('ユーザー登録処理でエラーが発生しました:', error);
        }
    };

    //ダイアログクローズ処理
    const handleSuccessDialogClose = () => {
        setOpenSuccessDialog(false);
        navigate('/'); // 成功した場合の遷移先
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
                        アカウント登録
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
                                value={name}
                                id="name"
                                placeholder="username123"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <EMailForm
                            email={email}
                            emailError={emailError}
                            errorMessage={emailErrorMessage}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordForm
                            password={password}
                            passwordError={passwordError}
                            errorMessage={passwordErrorMessage}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleRegister}
                        >
                            登録
                        </Button>
                    </Box>
                </Card>
            </Stack>

            <Dialog
                open={openSuccessDialog}
                onClose={handleSuccessDialogClose}
            >
                <DialogTitle>ユーザー登録完了（自動ログイン）</DialogTitle>
                <DialogActions>
                    <Button onClick={handleSuccessDialogClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}