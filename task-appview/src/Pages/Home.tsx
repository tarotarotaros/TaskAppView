import { Button, Typography } from '@mui/material'; // Material-UIを使用する例
import { Link, useNavigate } from 'react-router-dom';
import SideMenuWithHeader from '../Forms/SideMenuWithHeader';
import SigninStatus from '../Forms/Signin/SigninStatus';

const Home = () => {

  const navigate = useNavigate();

  const signout = () => {
    sessionStorage.removeItem('authToken')
    console.log("ログアウト")
    navigate('/'); // 更新
  }

  return (
    // <Container>
    <div>
      {/* // <Header />
 */}
      <SideMenuWithHeader />
      <Typography variant="h4" gutterBottom>
        ホームページ
      </Typography>
      <Typography variant="body1">
        このアプリケーションへようこそ！以下のリンクから新規登録画面へ移動できます。
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/signup"
      >
        新規登録
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/signin"
      >
        ログイン
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={signout}
      >
        ログアウト
      </Button>
      <SigninStatus /> </div>
    // </Container>

  );
};


export default Home;
