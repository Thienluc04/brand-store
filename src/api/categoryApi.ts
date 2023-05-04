import { Category, ListResponse } from "models";
import axiosClient from "./axiosClient";

const categoryApi = {
  getAll(): Promise<ListResponse<Category>> {
    const url = "/categories";
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });
  },
};

export default categoryApi;
