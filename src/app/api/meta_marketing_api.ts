import axios from "axios";


const getAllCampaigns = async (adAccountId: string, accessToken: string) => {
    try {

        const { adAccountId, getAdAccountIdError } = await getAdAccountId(accessToken);

        if (getAdAccountIdError) {
            return getAdAccountIdError;
        }

        const url = `https://graph.facebook.com/v19.0/${adAccountId}/campaigns?fields=name,status,objective`;

        const response = await axios.get(url, {
            params: {
                access_token: accessToken
            }
        });

        if (response.status == 200) {
            return { data: response.data["data"] }
        }
        return { getAllCampaignsError: "Error" }
    } catch (e: any) {
        return "DONE"
    }
}

const getAdsets = async (accessToken: string) => {
    try {

        const { adAccountId, getAdAccountIdError } = await getAdAccountId(accessToken);

        if (getAdAccountIdError) {
            return getAdAccountIdError;
        }

        const url = `https://graph.facebook.com/v19.0/${adAccountId}/adsets?fields=campaign_id,name,optimization_goal,bid_strategy,status`;

        const response = await axios.get(url, {
            params: {
                access_token: accessToken
            }
        });

        if (response.status == 200) {
            return { data: response.data["data"] }
        }
        return { getAdsetsError: "Error" }
    } catch (e: any) {
        return "DONE"
    }
}

const getAds = async (accessToken: string) => {
    try {
        const { adAccountId, getAdAccountIdError } = await getAdAccountId(accessToken);

        if (getAdAccountIdError) {
            return getAdAccountIdError;
        }

        const url = `https://graph.facebook.com/v19.0/${adAccountId}/ads?fields=campaign_id,adset_id,name,status,preview_shareable_link`;

        const response = await axios.get(url, {
            params: {
                access_token: accessToken
            }
        });

        if (response.status == 200) {
            return { data: response.data["data"] }
        }
        return { getAdsError: "Error" }
    } catch (e: any) {
        return "DONE"
    }
}

const createCampaign = async (campaign: any, accountId: string, accessToken: string) => {
    try {
        const url = `https://graph.facebook.com/v19.0/${accountId}/campaigns`;

        const response = await axios.post(url, {
            name: campaign.name,
            objective: campaign.objective,
            status: campaign.status,
            special_ad_categories: []
        }, {
            params: {
                access_token: accessToken
            }
        });

        if (response.status == 200) {
            return { campaignId: response.data["id"] }
        }
        return { createCampaignError: "Error" }
    } catch (e: any) {
        return { createCampaignError: e.response.headers }
    }
}

const createAdSet = async (adset: any, campaignId: any, accountId: any, accessToken: any) => {
    try {
        const url = `https://graph.facebook.com/v19.0/${accountId}/adsets`;

        const response = await axios.post(url, {
            "campaign_id": campaignId,
            "name": adset.name,
            "daily_budget": adset.daily_budget,
            "bid_amount": adset.bid_amount,
            "billing_event": adset.billing_event,
            "optimization_goal": adset.optimization_goal,
            "promoted_object": {
                "application_id": "645064660474863",
                "object_store_url": "http://www.facebook.com/gaming/play/645064660474863/"
            },
            "targeting": {
                "device_platforms": [
                    "mobile"
                ],
                "facebook_positions": [
                    "feed"
                ],
                "geo_locations": {
                    "countries": [
                        "IN"
                    ]
                },
                "publisher_platforms": [
                    "facebook",
                    "audience_network"
                ],
                "user_os": [
                    "Android"
                ]
            },
            "status": adset.status
        }, {
            params: {
                access_token: accessToken
            }
        });

        if (response.status == 200) {
            return { adSetId: response.data["id"] }
        }
        return { createAdSetError: response }
    } catch (e: any) {
        return { createAdSetError: e }
    }
}

const uploadImage = async (imageBytes: any, accountId: any, accessToken: any) => {
    try {

        const url = `https://graph.facebook.com/v19.0/${accountId}/adimages`

        const response = await axios.post(url, {
            bytes: imageBytes,
            access_token: accessToken
        });

        if (response.status == 200) {
            return { imageHash: response.data["images"]["bytes"]["hash"] }
        }
        return { imageHash: `uploadImageError in API: ${response}` }
    } catch (e: any) {
        return { uploadImageError: `uploadImageError: ${e}` }
    }
}

const createAdCreative = async (adCreative: any, imageHash: any, accountId: any, accessToken: any) => {
    try {
        const url = `https://graph.facebook.com/v19.0/${accountId}/adcreatives`

        const response = await axios.post(url, {
            "name": adCreative.name,
            "object_story_spec": {
                "page_id": "260564970462712",
                "link_data": {
                    "call_to_action": {
                        "type": adCreative.call_to_action_type,
                        "value": {
                            "link": "http://www.facebook.com/gaming/play/645064660474863/"
                        }
                    },
                    "image_hash": imageHash,
                    "link": "http://www.facebook.com/gaming/play/645064660474863/",
                    "message": adCreative.message
                }
            },
            "degrees_of_freedom_spec": {
                "creative_features_spec": {
                    "standard_enhancements": {
                        "enroll_status": "OPT_OUT"
                    }
                }
            },
            "access_token": accessToken,
        });
        if (response.status == 200) {
            return { creativeId: response.data["id"] }
        }
        return { createAdCreativeError: response }
    } catch (e: any) {
        return { createAdCreativeError: e.response.headers }
    }
}

const createAd = async (ad: any, adSetId: any, creativeId: any, accountId: any, accessToken: any) => {
    try {
        const url = `https://graph.facebook.com/v19.0/${accountId}/ads`

        const response = await axios.post(url, {
            name: ad.name,
            adset_id: adSetId,
            creative: `{creative_id: ${creativeId}}`,
            status: ad.status,
            access_token: accessToken
        });

        if (response.status == 200) {
            return { adId: response.data["id"] }
        }
        return { createAdError: response }
    } catch (e: any) {
        return { catchAdError: e.response.headers }
    }
}

const getAdAccountId = async (accessToken: any) => {
    try {
        const url = `https://graph.facebook.com/v19.0/me/adaccounts`

        const response = await axios.get(url, {
            params: {
                access_token: accessToken,
            }
        });

        if (response.status == 200) {
            return { adAccountId: response.data.data[0].id }
        }

        return { getAdAccountIdError: "Error occurred" }
    } catch (e: any) {
        return { getAdAccountIdError: e }
    }
}

// Other functions omitted for brevity

const testMetaMarketing = async (
    campaign: any,
    advert: any,
    adCreative: any,
    ad: any, imageBytes: string, accessToken: string) => {
    const { adAccountId, getAdAccountIdError } = await getAdAccountId(accessToken);

    if (getAdAccountIdError) {
        return getAdAccountIdError;
    }

    const { campaignId, createCampaignError } = await createCampaign(campaign, adAccountId, accessToken);

    if (createCampaignError) {
        return createCampaignError
    }

    const { adSetId, createAdSetError } = await createAdSet(advert, campaignId, adAccountId, accessToken);
    if (createAdSetError) {
        return createCampaignError
    }

    const { imageHash, uploadImageError } = await uploadImage(imageBytes, adAccountId, accessToken);
    if (uploadImageError) {
        return uploadImageError
    }

    const { creativeId, createAdCreativeError } = await createAdCreative(adCreative, imageHash, adAccountId, accessToken);
    if (createAdCreativeError) {
        return createAdCreativeError
    }
    const { adId, createAdError } = await createAd(ad, adSetId, creativeId, adAccountId, accessToken);
    if (createAdError) {
        return createAdError
    }

    return adId
};

const combinedExports = {
    testMetaMarketing,
    getAds,
    getAdsets,
    getAllCampaigns,
    getAdAccountId,
    createCampaign,
    createAdSet,
    uploadImage,
    createAdCreative,
    createAd,
};

export default combinedExports;