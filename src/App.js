import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import { fetchRandomPokemon } from './services/pokemon.service';
import ListItem from './ListItem/ListItem';

import React from 'react';

const DEFAULT_LOADING_TIME = 2000;

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPaused(false);
    }, DEFAULT_LOADING_TIME);

    if (list.length === 0) {
      setLoading(true);
      fetchRandomPokemon().then((pokemon) => {
        setLoading(false);
        setList(pokemon);
      }).catch((err) => {
        setError(err);
        setLoading(false);
      });
    }
  }, [list]);

  return (
    <div className="App">
      <header className="App-header">
        { loading || paused ? <img src={logo} className="App-logo" alt="logo" /> : null }
        { error ? <div>{ error.message }</div> : null}
        <ul className={
            loading || paused ? '-hidden list' : 'list'
          }>
            { list.map((pokemon) => <ListItem key={pokemon.id} pokemon={pokemon}/>) }
          </ul>
      </header>
    </div>
  );
}

export default App;
