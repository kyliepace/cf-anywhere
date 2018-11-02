import React, { Component } from 'react';
import './App.css';
import Header from './Header.jsx';


export default ({ children }) => {
  return (
    <div className='App'>
      <Header />
      {children}
    </div>
  );
};

