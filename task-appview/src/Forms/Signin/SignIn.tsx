import { Card, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EMailForm from '../Signup/EMailForm';
import PasswordForm from '../Signup/PasswordForm';
import '../Signup/SignupStyle.css';
import API from './../../Constants';

export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

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

    return isValid;
  };

  const handleSiginin = async () => {
    try {

      let isOk = validateInputs();
      if (!isOk) return;

      const apiUrl = new URL("api/user/login", API.BASE_URL);
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        // 成功した場合の処理
        console.log('ログイン成功');
        const data = await response.json();
        const token = data.token; // ここでAPIレスポンスからトークンを取得
        sessionStorage.setItem('authToken', token); // セッションストレージにトークンを保存        
        console.log(token);
        navigate('/'); // 成功した場合の遷移先
      } else {
        // エラーハンドリング
        console.error('ログイン失敗');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
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
            ログイン
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
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
              onClick={handleSiginin}
            >
              ログイン
            </Button>
          </Box>
        </Card>
      </Stack>
    </div>
  );
}
