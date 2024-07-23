import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import NavbarMain from './components/nav/NavbarMain';
import Card from './components/Card';
import Navbar from './components/nav/NavbarMain'
import './App.css'
import FetchStringComponent from './components/FetchStringComponent';
import CreateUserForm from './components/CreateUserForm';
import AuthContext from './AuthContext.tsx';// Adjust the import path as necessary


function App(){
  return (
    <>
      <NavbarMain/>
      <Card></Card>
      
      
    </>
  )
}

export default App
