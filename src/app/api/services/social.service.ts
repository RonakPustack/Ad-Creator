import axios from "axios";

const createPost = async (apiConfig: any, pageId: string, pageAccessToken: string, post: any) => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/social/create_post`;

        const response = await axios.post(url, {
            page_id: pageId,
            page_access_token: pageAccessToken,
            post: post,
        });

        if (response.status == 200) {
            return { postId: response.data }
        }
        return { createPostError: "Error" }
    } catch (e: any) {
        return { createPostError: e.response.data.message }
    }
}

const getAllPages = async (apiConfig: any, accessToken: string) => {
    try {
        const url = `${apiConfig.protocol}://${apiConfig.baseUrl}/v1/social/get_all_pages`;

        const response = await axios.get(url, {
            params: {
                access_token: accessToken,
            }
        });

        if (response.status == 200) {
            return { data: response.data }
        }
        return { getAllPagesError: "Error" }
    } catch (e: any) {
        return { getAllPagesError: e.response.data.message }
    }
}

export default {
    createPost,
    getAllPages,
}