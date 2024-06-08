import ReactAudioPlayer from 'react-audio-player';
import './ListItem.scss';
import React, { useEffect, useState } from 'react';

import redXOverlay from '../assets/images/red-x-overlay.png';
import PokeType from '../PokeType/PokeType';

function ListItem({ pokemon, settingsConfig }) {
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [selected, setSelected] = useState(false);

  const handleClick = (event) => {
    if (audioPlayer) {
      audioPlayer.audioEl.current.play();
    }

    setSelected(!selected);
  };

  useEffect(() => {
    if (audioPlayer && audioPlayer.audioEl.current) {
      audioPlayer.audioEl.current.volume = settingsConfig.playSounds ? settingsConfig.soundVolume : 0;
    }
  });

  return (
    <li className='list-item'>
      <button onClick={handleClick} className={selected ? 'selected poke-btn' : 'poke-btn'}>
        <img src={redXOverlay} className='item-img cross-overlay' alt='overlay' />
        <img src={pokemon.sprites.front_default} className="item-img" alt={pokemon.species.name} />
        { settingsConfig.showTypes ? <div className="types-cont">
          {pokemon.types.map((type) => <PokeType key={type.slot} type={type} />)}
        </div> : null }
      </button>
      
      <div className='list-item-label'>{pokemon.species.name}</div>

      <ReactAudioPlayer src={pokemon.cries.latest} ref={(player) => setAudioPlayer(player)}/>
    </li>
  );
}

export default ListItem;
