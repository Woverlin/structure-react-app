import baseApi from "./baseApi";

export const getAllCategories = () => {
    return baseApi(`/categories`, "GET");
};
export const createCategory = (data: any) => {
    return baseApi(`/categories`, "POST", data);
};
