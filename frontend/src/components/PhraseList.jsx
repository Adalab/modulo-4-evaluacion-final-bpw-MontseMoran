import React from 'react';
import { useEffect, useState } from 'react';
import './PhraseList.scss'
import PhraseCard from './PhraseCard';
import './PhraseCard.scss'

function PhraseList() {
      const [phrases, setPhrases] = useState([]);
      const [selectedCharacter, setSelectedCharacter] = useState('Todos');

  useEffect(() => {
    fetch('http://localhost:4000/frases')
      .then((res) => res.json())
      .then((data) => setPhrases(data))
      .catch((error) => console.error('Error al traer frases:', error));
  }, []);
const filteredPhrases = selectedCharacter === 'Todos'
  ? phrases
  : phrases.filter(phrase => phrase.personaje === selectedCharacter);

  return (
    <>
    <select value={selectedCharacter} onChange={(ev) => setSelectedCharacter(ev.target.value)}>
  <option value="Todos">Todos</option>
  
  {[...new Set(phrases.map(p => p.personaje))].map(personaje => (
    <option key={personaje} value={personaje}>{personaje}</option>
  ))}
</select>

    <section>
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
</section>
</>
  );
}

export default PhraseList