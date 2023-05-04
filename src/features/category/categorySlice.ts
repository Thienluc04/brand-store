import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Category, ListResponse } from "models";

export interface CategoryState {
  loading: boolean;
  list: Category[];
}

const initialState: CategoryState = {
  list: [],
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoryList(state) {
      state.loading = true;
    },
    fetchCategoryListSuccess(
      state,
      action: PayloadAction<ListResponse<Category>>
    ) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCategoryListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const categoryAction = categorySlice.actions;

// Selectors
export const selectCategoryList = (state: RootState) => state.category.list;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
