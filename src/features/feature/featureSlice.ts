import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListResponse } from "models";
import { Features } from "models/features";

export interface FeatureState {
  loading: boolean;
  list: Features[];
}

const initialState: FeatureState = {
  loading: false,
  list: [],
};

const featureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    fetchFeatureList(state) {
      state.loading = true;
    },

    fetchFeatureListSuccess(state, action: PayloadAction<ListResponse<Features>>) {
      state.loading = false;
      state.list = action.payload.data;
    },

    fetchFeatureListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const featureAction = featureSlice.actions;

// Selectors
export const selectFeatureList = (state: RootState) => state.feature.list;

// Reducers
const featureReducer = featureSlice.reducer;
export default featureReducer;
