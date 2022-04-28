import axios, { AxiosRequestConfig, Method } from "axios";
import { includes, isEmpty } from "lodash";

const URL = "http://localhost:3000";

const baseApi = async (
    path = "",
    method: Method = "GET",
    body = {},
    headers = {},
    mockData = {}
) => {
    if (!isEmpty(mockData)) {
        return Promise.resolve({
            code: 200,
            data: mockData,
        });
    } else {
        const options: AxiosRequestConfig = {
            method,
            url: `${URL}${path}`,
            headers,
            data: body,
        };
        console.log("options", options);

        try {
            const { data }: any = await axios(options);
            return data;
        } catch (error) {
            return Promise.reject({
                code: (error as any)?.response?.status || 9999,
                errorMessage:
                    (error as any)?.response?.data?.message ||
                    (error as any)?.response?.data?.data ||
                    "Sorry! Something went wrong",
            });
        }
    }
};
export default baseApi;
