import ReactAudioPlayer from 'react-audio-player';
import './ListItem.scss';
import React, { useState } from 'react';

import redXOverlay from '../assets/images/red-x-overlay.png';

function ListItem({ pokemon }) {
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [selected, setSelected] = useState(false);

  const handleClick = (event) => {
    if (audioPlayer) {
      audioPlayer.audioEl.current.play();
    }

    setSelected(!selected);
  };

  return (
    <li className='list-item'>
      <button onClick={handleClick} className={selected ? 'selected' : ''}>
        <img src={redXOverlay} className='cross-overlay' alt='overlay' />
        <img src={pokemon.sprites.front_default} alt={pokemon.species.name} />
      </button>
      
      <div className='list-item-label'>{pokemon.species.name}</div>

      <ReactAudioPlayer src={pokemon.cries.latest} ref={(player) => setAudioPlayer(player)}/>
    </li>
  );
}

export default ListItem;
