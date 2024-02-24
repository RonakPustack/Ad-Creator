import axios from "axios";

const getAllCountries = async (apiConfig: any) => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/ads/get_all_countries`;

        const response = await axios.get(url);

        if (response.status == 200) {
            return { data: response.data.data }
        }
        return { getAllCountriesError: "Error" }
    } catch (e: any) {
        return { getAllCountriesError: "Error" }
    }
}

export default {
    getAllCountries,
}