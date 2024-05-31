import './PokeTypeSwitch.scss';

function PokeTypeSwitch({ showTypes, setShowTypes }) {

  function toggleShowTypes() {
    setShowTypes(!showTypes);
  }

  return (
    <div className="poke-type-switch">
      <div className="switch-cont">
        <label className="switch">
          <input type="checkbox" onClick={toggleShowTypes}/>
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="poke-type-label">
        {showTypes ? 'Hide' : 'Show'} Types
      </div>
    </div>
  )
}

export default PokeTypeSwitch;
