import Switch from 'react-switch';
import SwitchComponent from '../helper/SwitchComponent';

type Campaign = {
    name?: string | null | undefined;
    objective?: string | null | undefined;
    status?: string | null | undefined
} | undefined


type Props = {
    campaign: Campaign,
    onChange: any,
}

const CampaignName: React.FC<any> = ({ campaign, onChange: onCampaignUpdate }: Props) => {

    const handleNameUpdate = (e: any) => {
        campaign = { ...campaign, name: e.target.value }
        onCampaignUpdate(campaign);
    }

    const handleDropdownChange = (e: any) => {
        campaign = { ...campaign, objective: e.target.value }
        onCampaignUpdate(campaign);
    }

    const handleSwitchChange = (e: any) => {
        if (e) {
            campaign = { ...campaign, status: "ACTIVE" }
        } else {
            campaign = { ...campaign, status: "PAUSED" }

        }

        onCampaignUpdate(campaign);
    }

    return (
        <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
            <div className="flex place-items-center mb-4">
                <p className="mr-2 text-white bg-green-800 rounded-full text-1xl h-5 w-5"><center>✔︎</center></p>
                <p className="text-black font-bold text-2xl">Campaign</p>
            </div>
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
                    <SwitchComponent checked={campaign?.status! == "ACTIVE"} onChange={handleSwitchChange} />
                    <p className='font-bold text-xs'> {campaign?.status}</p>
                </div>
            </div>
        </div>
    );
};

export default CampaignName;