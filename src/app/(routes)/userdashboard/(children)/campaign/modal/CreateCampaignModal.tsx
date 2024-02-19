import SwitchComponent from '@/app/components/helper/SwitchComponent';
import React, { useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import Dialog from '../../../components/Dialog';
import metaMarketingApi from "../../../../../api/meta_marketing_api";

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
            const { adAccountId, getAdAccountIdError } = await metaMarketingApi.getAdAccountId(accessToken)
            if (getAdAccountIdError) {
                console.error(getAdAccountIdError)
            }

            const campaign = {
                name: name,
                objective: objective,
                status: status,
            }

            const response = await metaMarketingApi.createCampaign(campaign, adAccountId, accessToken);
            setLoadingState(false)
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
                <ActionButton isLoading={isLoading} normalText="Create Campaign" loadingText="Creating..." handleSubmit={handleSubmit} />
            </div>
        </Dialog>
    );
};

export default CreateCampaignModal;
