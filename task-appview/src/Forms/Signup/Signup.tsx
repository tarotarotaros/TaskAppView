import { Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
import API from './../../Constants';
import EMailForm from './EMailForm';
import PasswordForm from './PasswordForm';
import './SignupStyle.css';

export default function SignUp() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openFailureDialog, setOpenFailureDialog] = useState(false);
    const navigate = useNavigate();

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleRegister = async () => {

        let isOk = validateInputs();
        if (!isOk) return;

        const registetApiUrl = new URL("api/user/register", API.BASE_URL);
        const response = await fetch(`${registetApiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            setOpenSuccessDialog(true);
            console.log('サインアップ成功');
        } else {
            setOpenFailureDialog(true);
            console.error('サインアップ失敗');
        }
    };

    const handleSuccessDialogClose = () => {
        setOpenSuccessDialog(false);
        navigate('/success-page'); // 成功した場合の遷移先
    };

    const handleFailureDialogClose = () => {
        setOpenFailureDialog(false);
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
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">ユーザー名</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
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
                            type="submit"
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
                <DialogTitle>登録成功</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ユーザーの登録が成功しました。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSuccessDialogClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openFailureDialog}
                onClose={handleFailureDialogClose}
            >
                <DialogTitle>登録失敗</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ユーザーの登録に失敗しました。再度お試しください。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFailureDialogClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}