import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ContextProvider} from './components';
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={theme}>
    <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>,
)
