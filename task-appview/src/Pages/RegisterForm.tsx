import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../Constants';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openFailureDialog, setOpenFailureDialog] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
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
            <TextField
                label="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="メールアドレス"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="パスワード"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleRegister}>
                新規登録
            </Button>

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
};

export default RegisterForm;
