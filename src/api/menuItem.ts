import baseApi from "./baseApi";

export const getMenuItem = (id: any, textSearch: string) => {
    return baseApi(`/menu-items/get-item-by-category/${id}?textSearch=${textSearch}`, "GET");
};
export const createMenuItem = (data: any) => {
    return baseApi(`/menu-items`, "POST", data);
}

export const deleteMenuItem = (id: any) => {
    return baseApi(`/menu-items/${id}`, "DELETE");
};

export const searchMenuItem = (id: any) => {
    return baseApi(`/menu-items/search-item/${id}`, "GET");
};
