import categoryApi from "api/categoryApi";
import { Category, ListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { categoryAction } from "./categorySlice";

function* fetchCategoryList() {
  try {
    const response: ListResponse<Category> = yield call(categoryApi.getAll);
    yield put(categoryAction.fetchCategoryListSuccess(response));
  } catch (error) {
    console.log("Failed to fetch category list", error);
  }
}

export default function* categorySaga() {
  yield takeLatest(categoryAction.fetchCategoryList.type, fetchCategoryList);
}
