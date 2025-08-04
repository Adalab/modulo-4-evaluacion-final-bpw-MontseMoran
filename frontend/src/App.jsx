import { useState } from 'react'
import './App.css'
import PhraseList from './components/PhraseList'
import headerImg from './assets/characters/header.png';

function App() {


  return (
    <>
        <header className="header">
  <img src={headerImg} alt="Título de Los Simpson" />
</header>
     <PhraseList/>
    </>
  )
}

export default App
