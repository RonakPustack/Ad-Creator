import axios from "axios";

const getAllAdCreatives = async (apiConfig: any) => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/ad_creatives`;

        console.log(url)

        const response = await axios.get(url);

        if (response.status == 200) {
            return { data: response.data.data }
        }
        return { getAllAdCreativesError: "Error" }
    } catch (e: any) {
        return { getAllAdCreativesError: "Error" }
    }
}

export default {
    getAllAdCreatives,
}