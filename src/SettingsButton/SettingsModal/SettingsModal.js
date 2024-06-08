import './SettingsModal.scss';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

function SettingsModal({ isOpen, onClose, settingsConfig, setSettingsCallback }) {
  const { register, handleSubmit } = useForm({
  	defaultValues: settingsConfig,
  	showTypes: false,
  });

	const onSubmit = (data) => {
		setSettingsCallback(data);
		onClose();
	};

	return (
	    <Modal open={isOpen} onClose={onClose} className="settings-modal">
	    	<Box sx={style}>
	    		<h2>Settings</h2>
	    		<form className="settings-controls" onSubmit={handleSubmit(onSubmit)}>
	    			<table>
	    				<tbody>
		    				<tr>
		    					<td>
						          	<label htmlFor="numToFetchInput">
						          		Number of Pokemon:
					            	</label>
				            	</td>
				            	<td>
									<input id="numToFetchInput" {...register("numToFetch")} type="number" min="1" max="30" />
				            	</td>
		    				</tr>

		    				<tr>
		    					<td>
			          				<label htmlFor="typeInput">Show Types:</label>
		    					</td>
		    					<td>
			          				<input id="typeInput" {...register("showTypes")} type="checkbox" />
		    					</td>
		    				</tr>

		    				<tr>
		    					<td>
			          				<label htmlFor="playSoundsInput">Play Sounds:</label>
		    					</td>
		    					<td>
			          				<input id="playSoundsInput" {...register("playSounds")} type="checkbox" />
		    					</td>
		    				</tr>

		    				<tr>
		    					<td>
			          				<label htmlFor="soundVolumeInput">Sound Volume:</label>
		    					</td>
		    					<td>
						          	<input
						          		id="soundVolumeInput" 
						          		{...register("soundVolume")}
								        type="range"
								        min="0"
								        max="1"
								        step="0.05"
								        className="sound-slider"
								        />
		    					</td>
		    				</tr>
	    				</tbody>
    				</table>

	          		<button className="submit-btn" type="submit">Save Settings</button>
	    		</form>
	    	</Box>
	    </Modal>
	);
}

export default SettingsModal;
