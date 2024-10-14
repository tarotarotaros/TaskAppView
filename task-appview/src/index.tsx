import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { themeConst } from './themeConst';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// フォントを含めたテーマを作成
const theme = createTheme({
  typography: {
    fontFamily: themeConst.FONT_TEXT, // 使用したいフォントファミリを指定
  },
  palette: {
    primary: {
      light: themeConst.THEME_COLOR_LIGHT,
      main: themeConst.THEME_COLOR_MAIN,
      dark: themeConst.THEME_COLOR_DARK,
      contrastText: themeConst.THTME_COLOR_FONT,
    },
    background: {
      default: themeConst.THEME_COLOR_BACK,
    },
  }
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
