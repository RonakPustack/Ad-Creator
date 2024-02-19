'use client'

import { useState } from "react";
import metaMarketingApi from "../api/meta_marketing_api";

import Ad from "./ad/Ad";
import AdCreative from "./ad/AdCreative";
import AdSetName from "./ad/Adset";
import CampaignName from "./ad/CampaignName";
import UploadImage from "./ad/UploadImage";
import Navbar from "./Navbar";
import UserCard from "./UserCard";


type User = {
    name?: string | null | undefined;
    // is mapped to uid
    email?: string | null | undefined;
    // is mapped to user token
    image?: string | null | undefined;
    id?: string | null | undefined;
} | undefined


type Props = {
    user: User,
}


export default function SessionPage({ user }: Props) {

    const [campaign, updateCampaign] = useState({ status: "ACTIVE", objective: "OUTCOME_AWARENESS" });
    const [adset, updateAdset] = useState({ status: "ACTIVE", optimization_goal: "NONE", billing_event: "IMPRESSIONS" });
    const [adcreative, updateAdCreative] = useState({ call_to_action_type: "BOOK_TRAVEL" });
    const [ad, updateAd] = useState({ status: "ACTIVE" });
    const [imageBytes, updateImageBytes] = useState('');
    const [isLoading, updateLoadingState] = useState(false);

    const handleImageChange = (e: string) => {
        updateImageBytes(e)
        console.log(imageBytes.substring(0, 10))
    }

    const handleSubmit = async () => {
        if (isLoading) return;

        console.log(adcreative)
        console.log(campaign);
        console.log(adset);
        console.log(ad);
        console.log(imageBytes);


        if (!imageBytes) {
            console.error("Image bytes are empty!")
            return;
        }

        try {
            updateLoadingState(true)

            const accountId = user?.email;
            const token = user?.image;

            const response = await metaMarketingApi.testMetaMarketing(
                campaign,
                adset,
                adcreative,
                ad,
                imageBytes,
                token!,
            )

            console.log(response)
            updateLoadingState(false)
        } catch (e) {
            console.log(e)
            updateLoadingState(false)
        } finally {
            updateLoadingState(false)
        }
    }

    return (
        <div className="flex space-x-28">
            <div className="w-1/4">
                <UserCard user={user} pagetype={"Home"} />
            </div>
            <div className="flex flex-col w-3/4">
                <CampaignName campaign={campaign} onChange={updateCampaign} />
                <AdSetName adset={adset} onChange={updateAdset} />
                <UploadImage onChange={handleImageChange} />
                <AdCreative adcreative={adcreative} onChange={updateAdCreative} />
                <Ad ad={ad} onChange={updateAd} />

                <button onClick={handleSubmit} className="flex p-4 bg-green-600 rounded-lg hover:bg-green-700 justify-center items-center" type="button">
                    {isLoading ? <div role="status">
                        <svg aria-hidden="true" className="mr-2 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div> : <div></div>}

                    {isLoading ? "Creating Ad..." : "Create Ad"}
                </button>
            </div>
        </div>
    );
}