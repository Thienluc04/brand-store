import { PayloadAction } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { ListParams, ListResponse, Product } from "models";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { productActions, selectProductQuery } from "./productSlice";
import { useAppSelector } from "app/hooks";

function* fetchProductList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Product> = yield call(productApi.getAll, action.payload);
    yield put(productActions.fetchProductListSuccess(response));
  } catch (error) {
    console.log("Failed to fetch product list", error);
    yield put(productActions.fetchProductListFailed());
  }
}

function* fetchProductListQuery(action: PayloadAction<string>) {
  try {
    const response: ListResponse<Product> = yield call(productApi.getByQuery, action.payload);
    yield put(productActions.fetchProductQuerySuccess(response));
  } catch (error) {
    console.log("Failed to fetch product list", error);
    yield put(productActions.fetchProductListFailed());
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductList.type, fetchProductList);
  yield takeLatest(productActions.fetchProductQuery.type, fetchProductListQuery);
}
