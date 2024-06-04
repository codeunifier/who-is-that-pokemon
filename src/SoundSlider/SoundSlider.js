function SoundSlider({ state, callback, disabled }) {
  return (
    <div className="sound-slider-cont">
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        defaultValue={state}
        className="sound-slider"
        id="sound-slider"
        value={state}
        onChange={(e) => callback(e.target.value)}
        disabled={disabled}
        />
    </div>
  );
}

export default SoundSlider;
