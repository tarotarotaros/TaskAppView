import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const font = "'Noto Sans JP', sans-serif";

// フォントを含めたテーマを作成
const theme = createTheme({
  typography: {
    fontFamily: font, // 使用したいフォントファミリを指定
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
