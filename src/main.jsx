import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { extendTheme, CssVarsProvider } from '@mui/joy/styles';
import './index.css';
import { CssBaseline } from '@mui/joy';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProjectDetail from './pages/ProjectDetail.jsx';

const green = '#00c776'
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#00b56b',
          500: '#00b56b',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          // solidBg: '#2fafc5',
          // 500: '#2fafc5',
          solidBg: green,
          500: green,
        },
      },
    },
  },
  fontFamily: {
    body: '"Inter", sans-serif',
    display: '"JetBrains Mono", monospace',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/:id" element={< ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  </React.StrictMode>
);