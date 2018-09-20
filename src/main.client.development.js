import React from 'react';
import { hydrate, render } from 'react-dom';
import HotDocument from './components/document/hot';
import './main.css';

const renderMethod = !!module.hot ? render : hydrate;
renderMethod(<HotDocument />, document.getElementById('root'));
