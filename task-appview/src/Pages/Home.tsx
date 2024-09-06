import { useNavigate } from 'react-router-dom';
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

      <SigninStatus /> </div>
    // </Container>

  );
};


export default Home;
