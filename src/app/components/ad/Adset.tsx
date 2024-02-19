import SwitchComponent from "../helper/SwitchComponent";

type Adset = {
    name?: string | null | undefined;
    daily_budget?: number | null | undefined;
    bid_amount?: number | null | undefined;
    billing_event?: string | null | undefined;
    optimization_goal?: string | null | undefined;
    status?: string | null | undefined;
} | undefined


type Props = {
    adset: Adset,
    onChange: any,
}

const AdSetName: React.FC<any> = ({ adset, onChange: onAdsetUpdate }: Props) => {

    const handleNameUpdate = (e: any) => {
        adset = { ...adset, name: e.target.value }
        onAdsetUpdate(adset);
    }
    const handleBidUpdate = (e: any) => {
        adset = { ...adset, bid_amount: e.target.value * 100 }
        onAdsetUpdate(adset);
    }
    const handleDailyBudgetUpdate = (e: any) => {
        adset = { ...adset, daily_budget: e.target.value * 100 }
        onAdsetUpdate(adset);
    }

    const handleBillingEventDropdownChange = (e: any) => {
        adset = { ...adset, billing_event: e.target.value }
        onAdsetUpdate(adset);
    }
    const handleOptimizationGoalChange = (e: any) => {
        adset = { ...adset, optimization_goal: e.target.value, billing_event: getBillingEventList(e.target.value)[0].value }
        onAdsetUpdate(adset);
    }

    const handleSwitchChange = (e: any) => {
        if (e) {
            adset = { ...adset, status: "ACTIVE" }
        } else {
            adset = { ...adset, status: "PAUSED" }

        }

        onAdsetUpdate(adset);
    }

    const getBillingEventList = (optimizationGoal: string) => {
        switch (optimizationGoal) {
            case "THRUPLAY":
                return [{ "name": "Thruplay", "value": "THRUPLAY" }, { "name": "Impressions", "value": "IMPRESSIONS" }]
            case "LINK_CLICKS":
                return [{ "name": "Link Clicks", "value": "LINK_CLICKS" }, { "name": "Impressions", "value": "IMPRESSIONS" }]
            default:
                return [{ "name": "Impressions", "value": "IMPRESSIONS" }]
        }
    }

    return (
        <div className="flex flex-col p-6 rounded-lg bg-white mb-4 text-black">
            <div className="flex place-items-center mb-4">
                <p className="mr-2 text-white bg-green-800 rounded-full text-1xl h-5 w-5"><center>✔︎</center></p>
                <p className="text-black font-bold text-2xl">Adset Name</p>
            </div>
            <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg" placeholder="Adset Name" onChange={handleNameUpdate} />

            <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg mt-2" type="number" placeholder="Daily Budget" onChange={handleDailyBudgetUpdate} />

            <input className="border-slate-500 border placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 p-2 text-black rounded-lg mt-2" type="number" placeholder="Bid Amount" onChange={handleBidUpdate} />

            <div className="border-slate-500 border placeholder-slate-400 p-2 text-black rounded-lg mt-2">
                <label htmlFor="dropdown">Optimization Goal:</label>
                <select id="dropdown" name="dropdown" onChange={handleOptimizationGoalChange} className="border-0 outline-0">
                    <option value="">None</option>
                    <option value="APP_INSTALLS">App Installs</option>
                    <option value="AD_RECALL_LIFT">Ad Recall Lift</option>
                    <option value="ENGAGED_USERS">Engaged Users</option>
                    <option value="EVENT_RESPONSES">Event Responses</option>
                    <option value="IMPRESSIONS">Impressions</option>
                    <option value="LEAD_GENERATION">Lead Generation</option>
                    <option value="LINK_CLICKS">Link Clicks</option>
                    <option value="OFFSITE_CONVERSIONS">Offsite Conversions</option>
                    <option value="PAGE_LIKES">Page Likes</option>
                    <option value="POST_ENGAGEMENT">Post Engagement</option>
                    <option value="REACH">Reach</option>
                    <option value="LANDING_PAGE_VIEWS">Landing Page Views</option>
                    <option value="VALUE">Value</option>
                    <option value="THRUPLAY">ThruPlay</option>
                    <option value="SOCIAL_IMPRESSIONS">Social Impressions</option>
                </select>
            </div>
            {adset?.optimization_goal ? <div className="border-slate-500 border placeholder-slate-400 p-2 text-black rounded-lg mt-2">
                <label htmlFor="dropdown">Billing Event:</label>
                <select id="dropdown" name="dropdown" onChange={handleBillingEventDropdownChange} className="border-0 outline-0">
                    {getBillingEventList(adset?.optimization_goal!).map((item, index) => (
                        <option key={index} value={item.value}>{item.name}</option>
                    ))}
                </select>
            </div> : <div />}

            <div className="border-slate-500 placeholder-slate-400 p-2 text-black mt-2 flex space-x-4">
                <label>Status:</label>
                <div className='flex flex-col items-center'>
                    <SwitchComponent checked={adset?.status! == "ACTIVE"} onChange={handleSwitchChange} />
                    <p className='font-bold text-xs'> {adset?.status}</p>
                </div>
            </div>
        </div>
    );
};

export default AdSetName;