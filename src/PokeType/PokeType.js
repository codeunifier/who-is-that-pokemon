import * as PokeTypeSvgs from '../assets/images/icons/types';
import './PokeType.scss';

function PokeType({ type }) {
  return (
    <div>
      <div className={type.type.name + ' icon poke-type'} key={type.slot}>
        <img alt={type.type.name} src={PokeTypeSvgs[type.type.name]}/>
      </div>
    </div>
  )
}

export default PokeType;
