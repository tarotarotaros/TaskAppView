
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  );
}

export default App;
