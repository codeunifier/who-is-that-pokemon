import logo from './logo.svg';
import './App.scss';
import './assets/styles/_types.scss';
import { useCallback, useEffect, useState } from 'react';

import { fetchRandomPokemon } from './services/pokemon.service';
import ListItem from './ListItem/ListItem';

import React from 'react';
import PokeTypeSwitch from './PokeTypeSwitch/PokeTypeSwitch';
import NumToFetchForm from './NumToFetchForm/NumToFetchForm';

const DEFAULT_LOADING_TIME = 2000;
const DEFAULT_POKEMON_TO_FETCH = 24;

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(true);
  const [showTypes, setShowTypes] = useState(false);
  const [numPerRow, setNumPerRow] = useState(6);

  function calculateNumPerRow(numToFetch) {
    // calculate the number of pokemon per row to evenly space out the number of pokemon fetched
    if (numToFetch % 6 === 0) {
      setNumPerRow(6);
    } else if (numToFetch % 5 === 0) {
      setNumPerRow(5);
    } else if (numToFetch % 4 === 0) {
      setNumPerRow(4);
    } else if (numToFetch % 3 === 0) {
      setNumPerRow(3);
    } else if (numToFetch % 2 === 0) {
      setNumPerRow(2);
    } else {
      setNumPerRow(5);
    }
  }
  
  const fetchPokemon = useCallback(async (numToFetch = DEFAULT_POKEMON_TO_FETCH) => {
    fetchRandomPokemon(numToFetch).then((pokemon) => {
      calculateNumPerRow(numToFetch);
      setLoading(false);
      setList(pokemon);
    }).catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPaused(false);
    }, DEFAULT_LOADING_TIME);

    if (list.length === 0) {
      setLoading(true);
      fetchPokemon();
    }
  }, [list, fetchPokemon]);

  return (
    <div className="App no-box-shadow">
      <div className="App-header">
        Who's That Pokemon?
      </div>
      { loading || paused ? <img src={logo} className="App-logo" alt="logo" /> : null }
      <div className={
            !list.length || paused ? 'content -hidden' : 'content'
          }>
        <div className="poke-cont">
          { error ? <div>{ error.message }</div> : null}
          <ul className={"list row-" + numPerRow}>
              { list.map((pokemon) => <ListItem key={pokemon.id} pokemon={pokemon} showTypes={showTypes}/>) }
            </ul>
        </div>
        <div className="settings-cont">
          <div className="num-fetch-cont">
            <NumToFetchForm numToFetch={DEFAULT_POKEMON_TO_FETCH} onSubmit={fetchPokemon}/>
          </div>
          <div className="poke-type-cont">
            <PokeTypeSwitch showTypes={showTypes} setShowTypes={setShowTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
