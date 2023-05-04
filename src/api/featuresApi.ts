import { ListResponse } from "models";
import axiosClient from "./axiosClient";
import { Features } from "models/features";

const featuresApi = {
  getAll(): Promise<ListResponse<Features>> {
    const url = "/features";
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });
  },

  getById(id: number): Promise<Features> {
    const url = `/features/${id}`;
    return axiosClient.get(url);
  },
};

export default featuresApi;
