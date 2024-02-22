import axios from "axios";

const PORT_NAME = "localhost:8081"
const ROUTE_NAME = "ads"



const getAllCampaigns = async () => {
    try {
        const url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/campaigns`;

        const response = await axios.get(url);

        console.log(response.data)

        if (response.status == 200) {
            return { data: response.data.data }
        }
        return { getAllCampaignsError: "Error" }
    } catch (e: any) {
        return { getAllCampaignsError: "Error" }
    }
}

const getAdsets = async (campaignId: string) => {
    try {
        let url;

        if (campaignId) {
            url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/adsets/${campaignId}`;
        } else {
            url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/adsets`;
        }

        const response = await axios.get(url);

        console.log(response.data)

        if (response.status == 200) {
            return { data: response.data.data }
        }
        return { getAdsetsError: "Error" }
    } catch (e: any) {
        return { getAdsetsError: "Error" }
    }
}

const getAds = async (adSetId: string) => {
    try {
        let url;

        if (adSetId) {
            url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/ad_entities/${adSetId}`;
        } else {
            url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/ad_entities`;
        }

        const response = await axios.get(url);

        if (response.status == 200) {
            return { data: response.data.data }
        }
        return { getAdsError: "Error" }
    } catch (e: any) {
        return { getAdsError: "Error" }
    }
}

const createCampaign = async (campaign: any, accountId: string, accessToken: string) => {
    try {
        const url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/campaigns`;

        const response = await axios.post(url, {
            campaign: campaign,
            ad_account_id: accountId,
            access_token: accessToken,
        });

        if (response.status == 200) {
            return { campaignId: response.data["id"] }
        }
        return { createCampaignError: "Error" }
    } catch (e: any) {
        return { createCampaignError: e.response.headers }
    }
}

const createAdSet = async (adSet: any, accountId: any, accessToken: any) => {
    try {
        const url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/adsets`;

        adSet.promotedObject = {
            "application_id": "645064660474863",
            "object_store_url": "http://www.facebook.com/gaming/play/645064660474863/"
        }

        adSet.targeting = {
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
        };

        const response = await axios.post(url, {
            adSet: adSet,
            ad_account_id: accountId,
            access_token: accessToken,
        });

        if (response.status == 200) {
            return { adSetId: response.data["id"] }
        }
        return { createAdSetError: "Error" }
    } catch (e: any) {
        return { createAdSetError: e }
    }
}

const uploadImage = async (imageBytes: any, accountId: any, accessToken: any) => {
    try {

        const url = `https://graph.facebook.com/v19.0/act_${accountId}/adimages`

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
        const url = `https://graph.facebook.com/v19.0/act_${accountId}/adcreatives`

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

const createAd = async (ad: any, accountId: any, accessToken: any) => {
    try {
        const url = `http://${PORT_NAME}/v1/${ROUTE_NAME}/ad_entities`;

        const response = await axios.post(url, {
            ad: ad,
            account_id: accountId,
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
            return { adAccountId: response.data.data[0].account_id }
        }

        return { getAdAccountIdError: "Error occurred" }
    } catch (e: any) {
        return { getAdAccountIdError: e }
    }
}


const combinedExports = {
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