import axios from "axios";
import { adCreative, countryAPI } from "./services";

const isLocal = true

const localApiConfig = {
    baseUrl: "localhost:8081",
    routeName: "ads",
    protocol: "http",
}

const liveApiConfig = {
    baseUrl: "api.artiai.org",
    routeName: "ads",
    protocol: "https",
}

const apiConfig = isLocal ? localApiConfig : liveApiConfig;

const getAllAdCreatives = async () => await adCreative.getAllAdCreatives(apiConfig);
const getAllCountries = async () => await countryAPI.getAllCountries(apiConfig);

const getAllCampaigns = async (accountId: string, accessToken: string) => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/campaigns`;

        const response = await axios.get(url, {
            params: {
                account_id: accountId,
                access_token: accessToken,
            }
        });

        if (response.status == 200) {
            return { data: response.data.data }
        }
        return { getAllCampaignsError: "Error" }
    } catch (e: any) {
        return { getAllCampaignsError: "Error" }
    }
}

const getAdsets = async (campaignId: string, accountId: string, accessToken: string) => {
    try {
        let url;

        if (campaignId) {
            url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/adsets/${campaignId}`;
        } else {
            url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/adsets`;
        }

        const response = await axios.get(url, {
            params: {
                account_id: accountId,
                access_token: accessToken,
            }
        });

        if (response.status == 200) {
            return { data: response.data.data }
        }
        return { getAdsetsError: "Error" }
    } catch (e: any) {
        return { getAdsetsError: "Error" }
    }
}

const getAds = async (adSetId: string, accountId: string, accessToken: string) => {
    try {
        let url;

        if (adSetId) {
            url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/ad_entities/${adSetId}`;
        } else {
            url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/ad_entities`;
        }

        const response = await axios.get(url, {
            params: {
                account_id: accountId,
                access_token: accessToken,
            }
        });

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
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/campaigns`;

        console.log(url)

        const campaignObject = {
            campaign: campaign,
            account_id: accountId,
            access_token: accessToken
        };

        console.log(campaignObject)

        const response = await axios.post(url, campaignObject);

        if (response.status == 200) {
            return { campaignId: response.data["id"] }
        }
        return { createCampaignError: "Error" }
    } catch (e: any) {
        return { createCampaignError: e.response.headers }
    }
}

const createAdSet = async (adSet: any, accountId: any, accessToken: any, country: any) => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/adsets`;

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
                    country
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
            account_id: accountId,
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

const createAd = async (ad: any, accountId: any, accessToken: any) => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/ad_entities`;

        const reqBody = {
            ad: ad,
            account_id: accountId,
            access_token: accessToken
        }

        console.log(url)
        console.log(JSON.stringify(reqBody))

        const response = await axios.post(url, reqBody);

        if (response.status == 200) {
            return { adId: response.data["id"] }
        }
        return { createAdError: response }
    } catch (e: any) {
        return { catchAdError: e.response.headers }
    }
}

const sendMarketingEmail = async () => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/send_marketing_email`;

        const reqBody = {

        }

        const response = await axios.post(url, reqBody);

        return { response: response }
    } catch (e: any) {
        return { sendMarketingEmailError: e }
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
    sendMarketingEmail,
    getAllAdCreatives,
    getAllCountries,
};

export default combinedExports;