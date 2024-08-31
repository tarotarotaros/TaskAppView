import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material'; // Material-UIを使用する例

const HomePage = () => {
  return (
    <Container>
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
        to="/register"
      >
        新規登録はこちら
      </Button>
    </Container>
  );
};


export default HomePage;
