import * as PokeTypeSvgs from '../assets/images/icons/types';
import './PokeType.scss';

function PokeType({ type }) {
  return (
    <div className="poke-type" key={type.slot}>
      <img className={type.type.name + ' icon'} alt={type.type.name} src={PokeTypeSvgs[type.type.name]}/>
    </div>
  )
}

export default PokeType;
