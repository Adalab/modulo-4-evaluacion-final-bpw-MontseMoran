import React from 'react';
import { useEffect, useState } from 'react';
import './PhraseList.scss'
import PhraseCard from './PhraseCard';
import './PhraseCard.scss'


function PhraseList() {
      const [phrases, setPhrases] = useState([]);
      const [selectedCharacter, setSelectedCharacter] = useState('Todos');

  useEffect(() => {
   fetch('https://modulo-4-evaluacion-final-bpw-montsemoran.onrender.com/frases')

      .then((res) => res.json())
      .then((data) => setPhrases(data))
      .catch((error) => console.error('Error al traer frases:', error));
  }, []);
const filteredPhrases = selectedCharacter === 'Todos'
  ? phrases
  : phrases.filter(phrase => phrase.personaje === selectedCharacter);

  return (
      <section className='main-wrapper'>
   
    <div className='phrase-list__container'>
    <select className='select-characters' value={selectedCharacter} onChange={(ev) => setSelectedCharacter(ev.target.value)}>
      <option value="Todos" disabled hidden>Selecciona un personaje</option>
  <option value="Todos">Todos</option>
  
  {[...new Set(phrases.map(p => p.personaje))].map(personaje => (
    <option key={personaje} value={personaje}>{personaje}</option>
  ))}
</select>
  
        <ul className='phrase-list'>
  {filteredPhrases.map((phrase) => (
    <li key={phrase.id_frases}> 
    <PhraseCard
    texto={phrase.texto}
    personaje={phrase.personaje}
    />
    </li>
  ))}
</ul>
</div>
</section>

  );
}

export default PhraseList