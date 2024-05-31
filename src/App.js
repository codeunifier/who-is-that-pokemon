import logo from './logo.svg';
import './App.css';
import './assets/styles/_types.scss';
import { useEffect, useState } from 'react';

import { fetchRandomPokemon } from './services/pokemon.service';
import ListItem from './ListItem/ListItem';

import React from 'react';
import PokeTypeSwitch from './PokeTypeSwitch/PokeTypeSwitch';

const DEFAULT_LOADING_TIME = 2000;

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(true);
  const [showTypes, setShowTypes] = useState(false);

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
    <div className="App no-box-shadow">
      <div class="App-header">
        Who's That Pokemon?
      </div>
      { loading || paused ? <img src={logo} className="App-logo" alt="logo" /> : null }
      <div className={
            loading || paused ? 'content -hidden' : 'content'
          }>
        <div className="poke-cont">
          { error ? <div>{ error.message }</div> : null}
          <ul className="list">
              { list.map((pokemon) => <ListItem key={pokemon.id} pokemon={pokemon} showTypes={showTypes}/>) }
            </ul>
        </div>
        <div className="poke-type-cont">
          <PokeTypeSwitch showTypes={showTypes} setShowTypes={setShowTypes} />
        </div>
      </div>
    </div>
  );
}

export default App;
