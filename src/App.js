import logo from './logo.svg';
import './App.scss';
import './assets/styles/_types.scss';
import { useCallback, useEffect, useState } from 'react';

import { fetchRandomPokemon } from './services/pokemon.service';
import ListItem from './ListItem/ListItem';

import React from 'react';

import SettingsButton from './SettingsButton/SettingsButton';

const DEFAULT_LOADING_TIME = 2000;
const DEFAULT_POKEMON_TO_FETCH = 12;
const DEFAULT_SOUND_VOLUME = .3;
const DEFAULT_SETTINGS_CONFIG = {
  numToFetch: DEFAULT_POKEMON_TO_FETCH,
  showTypes: false,
  playSounds: true,
  soundVolume: DEFAULT_SOUND_VOLUME,
};

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(true);
  const [numPerRow, setNumPerRow] = useState(6);
  const [settingsConfig, setSettingsConfig] = useState(DEFAULT_SETTINGS_CONFIG);

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
  
  const fetchPokemon = useCallback(async (numToFetch) => {
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
      fetchPokemon(settingsConfig.numToFetch);
    }
  }, [list, fetchPokemon, settingsConfig]);

  const handleSettingsChange = (newSettingsConfig) => {
    setSettingsConfig(newSettingsConfig);

    if (settingsConfig.numToFetch !== newSettingsConfig.numToFetch) {
      fetchPokemon(newSettingsConfig.numToFetch);
    }
  }

  return (
    <div className="App no-box-shadow">
      <div className="App-header">
        <div className="title">
          Who's That Pokemon?
        </div>
        <SettingsButton showSettings={loading || paused} settingsConfig={settingsConfig} setSettingsCallback={handleSettingsChange}/>
      </div>
      { loading || paused ? <img src={logo} className="App-logo" alt="logo" /> : null }
      <div className={
            !list.length || paused ? 'content -hidden' : 'content'
          }>
        <div className="poke-cont">
          { error ? <div>{ error.message }</div> : null}
          <ul className={"list row-" + numPerRow}>
              { list.map((pokemon) => <ListItem key={pokemon.id} pokemon={pokemon} settingsConfig={settingsConfig} />) }
            </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
