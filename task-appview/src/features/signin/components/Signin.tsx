import { Card, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import EMailForm from '../../../common/components/EMailForm';
import PasswordForm from '../../../common/components/PasswordForm';
import { IUserService } from '../../../infrastructures/IUserService';
import '../styles/SignupStyle.css';

type SideMenuWithHeaderProps = {
  userService: IUserService;
};

export default function Signin({ userService }: SideMenuWithHeaderProps) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSigninDialog, setOpenSigninDialog] = useState(false);

  const signinKey: string = "signin";

  const validateInputs = () => {
    const email = document.getElementById(signinKey + "email") as HTMLInputElement;
    const password = document.getElementById(signinKey + "password") as HTMLInputElement;

    let isValid = true;

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

  const handleSiginin = async () => {
    try {
      let isOk = validateInputs();
      if (!isOk) return;

      const signinUserData = {
        email: email,
        password: password,
      }
      await userService.signin(signinUserData);
      console.log('ログイン完了');
      setOpenSigninDialog(true);

    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  function closeSigninDialog() {
    setOpenSigninDialog(false);
    window.location.reload();
  }

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
            ログイン
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <EMailForm
              keyText={signinKey}
              email={email}
              emailError={emailError}
              errorMessage={emailErrorMessage}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordForm
              keyText={signinKey}
              password={password}
              passwordError={passwordError}
              errorMessage={passwordErrorMessage}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSiginin}
            >
              ログイン
            </Button>
          </Box>
        </Card>

      </Stack>
      <Dialog
        open={openSigninDialog}
      >
        <DialogTitle>ログイン完了</DialogTitle>
        <DialogActions>
          <Button onClick={closeSigninDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
