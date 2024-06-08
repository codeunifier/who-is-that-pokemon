import './SettingsButton.scss';

import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

import SettingsModal from './SettingsModal/SettingsModal';

function SettingsButton({ showSettings, settingsConfig, setSettingsCallback }) {
	const [isOpen, setIsOpen] = useState(false);

	const openSettingsModal = () => setIsOpen(true);
	const closeSettingsModal = () => setIsOpen(false);

	const settingsModalCallback = (data) => {
		setSettingsCallback(data);
		setIsOpen(false);
	}

	return (
		<div className="settings-cont">
			<div className="settings-btn-cont" onClick={openSettingsModal}>
				{ showSettings ? null : <SettingsIcon /> }
		    </div>
		    <SettingsModal isOpen={isOpen} onClose={closeSettingsModal} settingsConfig={settingsConfig} setSettingsCallback={settingsModalCallback}/>
		</div>
    );
}

export default SettingsButton;
