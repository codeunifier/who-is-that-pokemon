import './SwitchInput.scss';

function SwitchInput({ state, callback, label }) {

  function toggleState() {
    callback(!state);
  }

  return (
    <div className="poke-type-switch">
      <div className="poke-type-label">
        {label}: {state ? 'On' : 'Off'}
      </div>
      
      <div className="switch-cont">
        <label className="switch">
          <input type="checkbox" onClick={toggleState} defaultChecked={state}/>
          <span className="slider"></span>
        </label>
      </div>
      
    </div>
  )
}

export default SwitchInput;
