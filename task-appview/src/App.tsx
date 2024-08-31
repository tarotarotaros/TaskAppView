
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Pages/RegisterForm'; // 先ほど作成したコンポーネント
import SuccessPage from './Pages/SuccessPage'; // 成功時に遷移するページ
import HomePage from './Pages/HomePage'; // ホームページ

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/success-page" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
