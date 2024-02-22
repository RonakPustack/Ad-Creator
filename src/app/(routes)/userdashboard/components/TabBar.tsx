"use client";

import { usePathname, useParams, useRouter, } from "next/navigation";
import Link from 'next/link';
import CreateCampaignModal from '../(children)/campaign/modal/CreateCampaignModal';
import { useState } from "react";
import CreateAdsetModal from "../(children)/adsets/modal/CreateAdsetModal";
import CreateAdsModal from "../(children)/ads/modal/CreateAdsModal";

export default function TabBar({ accessToken }: { accessToken: string }) {
    const pathname = usePathname();
    const params = useParams();

    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const tabState = {
        isCampaignTabSelected: pathname.split("/")[2] == "campaign",
        isAdSetTabSelected: pathname.split("/")[2] == "adsets",
        isAdTabSelected: pathname.split("/")[2] == "ads",
    }

    return (
        <>
            <div className="flex w-full self-start mt-10 ml-5 text-[20px]">
                <Link href="/userdashboard/campaign" className={`flex grow rounded-t-lg px-4 py-3 ${tabState.isCampaignTabSelected ? 'scale-100 bg-white' : 'scale-90 bg-slate-200'}`}>
                    <div className={`flex grow justify-between`}>
                        <div className={`${tabState.isCampaignTabSelected ? 'text-blue-600' : 'text-black-600'}`}>Campaign</div>
                        {tabState.isCampaignTabSelected ? <button className="justify-center items-center text-center text-white bg-blue-600 aspect-square h-[35px] rounded-lg" onClick={openDialog}>+</button> : <></>}
                    </div>
                </Link>
                {tabState.isCampaignTabSelected ? <CreateCampaignModal isOpen={isOpen} onClose={closeDialog} accessToken={accessToken} /> : tabState.isAdSetTabSelected ? <CreateAdsetModal isOpen={isOpen} onClose={closeDialog} accessToken={accessToken} campaignId={params.campaignId} /> : <CreateAdsModal isOpen={isOpen} onClose={closeDialog} accessToken={accessToken} adSetId={params.adSetId} campaignId={params.campaignId} />}

                <Link href="" className={`flex grow rounded-t-lg px-4 py-3 ${tabState.isAdSetTabSelected ? 'scale-100 bg-white' : 'scale-90 bg-slate-200'}`}>
                    <div className={`flex grow justify-between`}>
                        <div className={`${tabState.isAdSetTabSelected ? 'text-blue-600' : 'text-black-600'}`}>Adsets</div>
                        {tabState.isAdSetTabSelected && (params.campaignId || params.adSetId) ? <div className="justify-center items-center text-center text-white bg-blue-600 aspect-square h-[35px] rounded-lg" onClick={openDialog}>+</div> : <></>}
                    </div>
                </Link>
                <Link href="" className={`mr-10 flex grow rounded-t-lg px-4 py-3 ${tabState.isAdTabSelected ? 'scale-100 bg-white' : 'scale-90 bg-slate-200'}`}>
                    <div className={`flex grow justify-between`}>
                        <div className={`${tabState.isAdTabSelected ? 'text-blue-600' : 'text-black-600'}`}>Ads</div>
                        {tabState.isAdTabSelected && (params.campaignId || params.adSetId) ? <div className="justify-center items-center text-center text-white bg-blue-600 aspect-square h-[35px] rounded-lg" onClick={openDialog}>+</div> : <></>}
                    </div>
                </Link>
            </div>
        </>
    );
}