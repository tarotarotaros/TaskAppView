
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './features/home/components/Home';
import { API_URL } from './infrastructures/API';

function App() {
  console.log("API:" + API_URL);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
