// DialogBox.tsx

import SwitchComponent from '@/app/components/helper/SwitchComponent';
import React, { useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import Dialog from '../../../components/Dialog';

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateAdsModal: React.FC<DialogBoxProps> = ({ isOpen, onClose }) => {
    const [name, updateName] = useState("");
    const [objective, updateObjective] = useState("OUTCOME_AWARENESS");
    const [status, updateStatus] = useState("ACTIVE")


    const handleNameUpdate = (e: any) => {
        updateName(e.target.value)
    }

    const handleDropdownChange = (e: any) => {
        updateObjective(e.target.value)
    }

    const handleSwitchChange = (e: Boolean) => {
        updateStatus(e ? "ACTIVE" : "PAUSED")
    }

    const handleSubmit = () => {

    }


    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
                <p className="text-black font-bold text-2xl">Create Ad</p>
                <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg" placeholder="My Awesome Campaign" onChange={handleNameUpdate} />

                <div className="border-slate-500 border placeholder-slate-400 p-2 text-black rounded-lg mt-2">
                    <label htmlFor="dropdown">Campaign Objective:</label>
                    <select id="dropdown" name="dropdown" onChange={handleDropdownChange} className="border-0 outline-0">
                        <option value="OUTCOME_AWARENESS">Awareness</option>
                        <option value="OUTCOME_ENGAGEMENT">Engagement</option>
                        <option value="OUTCOME_LEADS">Leads</option>
                        <option value="OUTCOME_SALES">Sales</option>
                        <option value="OUTCOME_TRAFFIC">Traffic</option>
                        <option value="OUTCOME_APP_PROMOTION">App Promotion</option>
                    </select>
                </div>

                <div className="border-slate-500 placeholder-slate-400 p-2 text-black mt-2 flex space-x-4">
                    <label>Status:</label>
                    <div className='flex flex-col items-center'>
                        <SwitchComponent checked={"ACTIVE" == "ACTIVE"} onChange={handleSwitchChange} />
                        <p className='font-bold text-xs'>ACTIVE</p>
                    </div>
                </div>
                <ActionButton loading={false} normalText="Create Campaign" loadingText="Creating Campaign" handleSubmit={handleSubmit} />
            </div>
        </Dialog>
    );
};

export default CreateAdsModal;
