
import React, { useState } from 'react';
import styled from '@emotion/styled';
import API from '../Constants';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import SignIn from '../Forms/Signin/SignIn';

const Login = () => {

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };


    const handleSignup = async () => {
        try {
            const apiUrl = new URL("api/user/register", API.BASE_URL);
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: "name",
                    email: email,
                    password: password,
                }),
            });
            if (response.ok) {
                // 成功した場合の処理
                console.log('サインアップ成功');
                console.log(response.body);
            } else {
                // エラーハンドリング
                console.error('サインアップ失敗');
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    };


    const handleLogin = async () => {
        try {
            const apiUrl = new URL("api/user/login", API.BASE_URL);
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: "name",
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
            } else {
                // エラーハンドリング
                console.error('ログイン失敗');
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    };


    return(
        <SignIn/>
    );

    // return (
    //     <>
    //         <Button onClick={handleOpen}>ログイン画面へ</Button>
    //         <Modal open={open} onClose={handleOpen}>
    //             <StyledPaper>
    //                 <form className='form'>
    //                     <Typography variant={'h5'}>ログイン</Typography>
    //                     <TextField
    //                         label="メールアドレス"
    //                         variant="standard"
    //                         className="text"
    //                         value={email}
    //                         onChange={(e) => setEmail(e.target.value)}
    //                     />
    //                     <TextField
    //                         label="パスワード"
    //                         variant="standard"
    //                         className="text"
    //                         type="password"
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                     />
    //                     <center><Button className="login btn" onClick={handleLogin}>ログイン</Button></center>
    //                     <center><Button className="signup btn" onClick={handleSignup}>新規会員登録はこちら</Button></center>
    //                     <center><Button variant="outlined" onClick={handleOpen}>閉じる</Button></center>

    //                 </form>
    //             </StyledPaper>
    //         </Modal>
    //     </>
    // );
};

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  width: 960px;
  height: 540px;
  .form {
    width: 60%;
    margin: 3rem;
    text-align: center;
  }
  .text {
    width: 100%;
    margin: 1rem 0;
  }
  .btn {
    width: 60%;
    color: white;
    text-align: center;
    margin: 1.5rem 0;
  }
  .login {
    background-color: lightseagreen;
  }
  .signup {
    background-color: #06579b;
  }
`;

export default Login;
