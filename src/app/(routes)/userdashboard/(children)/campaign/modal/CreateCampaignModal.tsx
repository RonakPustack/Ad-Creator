import SwitchComponent from '@/app/components/helper/SwitchComponent';
import React, { useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import Dialog from '../../../components/Dialog';
import api from "../../../../../api/arti_api";
import metaApi from "../../../../../api/meta_marketing_api";

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
    accessToken: string;
}

const CreateCampaignModal: React.FC<DialogBoxProps> = ({ isOpen, onClose, accessToken }) => {
    const [name, updateName] = useState("");
    const [objective, updateObjective] = useState("OUTCOME_AWARENESS");
    const [status, updateStatus] = useState("ACTIVE")
    const [isLoading, setLoadingState] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const handleNameUpdate = (e: any) => {
        updateName(e.target.value)
        console.log(name)
    }

    const handleDropdownChange = (e: any) => {
        updateObjective(e.target.value)
    }

    const handleSwitchChange = (e: Boolean) => {
        updateStatus(e ? "ACTIVE" : "PAUSED")
    }


    const handleSubmit = async () => {
        setLoadingState(true)

        try {
            const { adAccountId, getAdAccountIdError } = await api.getAdAccountId(accessToken)

            if (getAdAccountIdError) {
                console.log(JSON.stringify(getAdAccountIdError))
                setErrorMessage(getAdAccountIdError.response.data.error.message)
                return;
            }

            const campaign = {
                name: name,
                objective: objective,
                status: status,
            }

            const { campaignId, createCampaignError } = await api.createCampaign(campaign, adAccountId!, accessToken);
            if (createCampaignError) {
                console.log(JSON.stringify(createCampaignError))
                setErrorMessage(createCampaignError.response.data.error.message)
                return;
            }

            onClose();
        } catch (e) { } finally {
            setLoadingState(false)
        }
    }


    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
                <p className="text-black font-bold text-2xl mb-6">Create Campaign</p>
                <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg mb-2" placeholder="My Awesome Campaign" onChange={handleNameUpdate} />

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
                        <SwitchComponent checked={status == "ACTIVE"} onChange={handleSwitchChange} />
                        <p className='font-bold text-xs'>{status}</p>
                    </div>
                </div>
                {errorMessage ? <p className='mt-4 text-red-700 align-middle text-sm'>{errorMessage}</p> : <></>}
                <ActionButton isLoading={isLoading} normalText="Create Campaign" loadingText="Creating..." handleSubmit={handleSubmit} />
            </div>
        </Dialog>
    );
};

export default CreateCampaignModal;
