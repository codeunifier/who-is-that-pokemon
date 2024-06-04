function SoundSlider({ state, callback }) {
  return (
    <div className="sound-slider-cont">
      <input type="range" min="0" max="1" step="0.05" defaultValue={state} className="sound-slider" id="sound-slider" onChange={(e) => callback(e.target.value)} />
    </div>
  );
}

export default SoundSlider;
