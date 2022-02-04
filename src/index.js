import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Container } from '@mui/material';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';

ReactDOM.render(
  <Container maxWidth='false'>
    <PrimarySearchAppBar />
    <App />
  </Container>,
  document.getElementById('root')
);
