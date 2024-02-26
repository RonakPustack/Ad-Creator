import axios from "axios";
import { adCreative, countryAPI, social } from "./services";

const isLocal = false

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

const getAllPages = async (accessToken: string) => await social.getAllPages(apiConfig, accessToken);
const createPost = async (pageId: string, pageAccessToken: string, post: any) => await social.createPost(apiConfig, pageId, pageAccessToken, post);

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

        const campaignObject = {
            campaign: campaign,
            account_id: accountId,
            access_token: accessToken
        };

        const response = await axios.post(url, campaignObject);

        if (response.status == 200) {
            return { campaignId: response.data }
        }
        return { createCampaignError: "An unknown error occurred" }
    } catch (e: any) {
        return { createCampaignError: e.response.data.message }
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
                    country,
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
            return { adSetId: response.data }
        }
        return { createAdSetError: 'An unknown error occurred!' }
    } catch (e: any) {
        console.log(e.response)
        return { createAdSetError: e.response.data.message }
    }
}

const uploadImage = async (imageBytes: any, accountId: any, accessToken: any) => {
    try {
        if (!imageBytes) {
            return { uploadImageError: `Please select an image.` }
        }

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
        console.log(e.response.data)
        return { uploadImageError: "e.response" }
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
        return { createAdCreativeError: 'An unknown error occurred!' }
    } catch (e: any) {
        if (e.response) {
            if (e.response.data.error.error_user_msg) {
                return { createAdCreativeError: e.response.data.error.error_user_msg }
            } else if (e.response.data.error.message) {
                const msg = e.response.data.error.message
                const list = msg.split(":")
                return { createAdCreativeError: list[list.length - 1] }
            }
        }
        return { createAdCreativeError: "An unknown error occurred!" }
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

        const response = await axios.post(url, reqBody);

        if (response.status == 200) {
            return { adId: response.data }
        }
        return { createAdError: 'An unknown error occurred!' }
    } catch (e: any) {
        return { createAdError: e.response.data.message }
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
        console.log('triggered getAdAccountId')
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/${apiConfig.routeName}/get_ad_account_id`;

        const response = await axios.post(url, {
            access_token: accessToken
        },);

        if (response.status == 200) {
            return { adAccountId: response.data.data }
        }
        return { getAdAccountIdError: "An unknown error occurred" }
    } catch (e: any) {
        return { getAdAccountIdError: e.response.data.message }
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
    createPost,
    getAllPages,
};

export default combinedExports;