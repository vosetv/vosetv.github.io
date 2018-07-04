import './main.css';
import React from 'react';
import { hydrate, render } from 'react-dom';
import Document from './components/document';

const renderMethod = !!module.hot ? render : hydrate;
renderMethod(<Document />, document.getElementById('root'));
