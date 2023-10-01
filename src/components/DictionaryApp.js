// src/DictionaryApp.js
import React, { useState } from 'react';
import './DictionaryApp.css';

function DictionaryApp() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [phonetics, setPhonetics] = useState([]);
  const [meanings, setMeanings] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (data.length > 0) {
        const firstResult = data[0];
        setDefinition(firstResult.meanings[0].definitions[0].definition);
        setPhonetics(firstResult.phonetics);
        setMeanings(firstResult.meanings);
      } else {
        setDefinition('Word not found.');
        setPhonetics([]);
        setMeanings([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setDefinition('Error fetching data.');
      setPhonetics([]);
      setMeanings([]);
    }
  };

  return (
    <div className="dictionary-app">
      <h1>Dictionary App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="definition">
        <p>{definition}</p>
      </div>
      <div className="phonetics">
        {phonetics.map((phonetic, index) => (
          <div key={index}>
            <p>{phonetic.text}</p>
            {phonetic.audio && (
              <audio controls>
                <source src={phonetic.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </div>
      <div className="meanings">
        {meanings.map((meaning, index) => (
          <div key={index}>
            <h2>{meaning.partOfSpeech}</h2>
            <ul>
              {meaning.definitions.map((definition, idx) => (
                <li key={idx}>
                  {definition.definition}
                  {definition.example && (
                    <p className="example">Example: {definition.example}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DictionaryApp;
