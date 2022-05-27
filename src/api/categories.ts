import baseApi from "./baseApi";

export const getAllPost = () => {
    return baseApi(`/posts`, "GET");
};


//change something here