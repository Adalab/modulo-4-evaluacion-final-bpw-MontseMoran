import React from 'react';
import homerImg from '../assets/characters/homer.png';
import bartImg from '../assets/characters/bart.png';
import lisaImg from '../assets/characters/lisa.png';
import maggieImg from '../assets/characters/maggie.png';
import margeImg from '../assets/characters/marge.png';
import milhouseImg from '../assets/characters/milhouse.png';
import burnsImg from '../assets/characters/burns.png';
import nedImg from '../assets/characters/ned.png';

function PhraseCard({ texto, personaje }) {
    let characterImg;
    if (personaje === 'Homer'){
        characterImg = homerImg
    } else if (personaje === 'Lisa'){
        characterImg = lisaImg
    }else if (personaje === 'Bart'){
        characterImg = bartImg
    }else if (personaje === 'Maggie'){
        characterImg = maggieImg
    }else if (personaje === 'Marge'){
        characterImg = margeImg
    }else if (personaje === 'Burns'){
        characterImg = burnsImg
    }else if (personaje === 'Ned'){
        characterImg = nedImg
    }else if (personaje === 'Milhouse'){
        characterImg = milhouseImg
    }

  return (
    <article>
      <p className='phrase-text'>"{texto}"</p>
      <p className='phrase-character'>{personaje}</p>
      <img src={characterImg} alt={personaje} className="character-img" />

    </article>
  );
}

export default PhraseCard;
