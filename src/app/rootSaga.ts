import categorySaga from "features/category/categorySaga";
import featureSaga from "features/feature/featureSaga";
import productSaga from "features/product/productSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([categorySaga(), productSaga(), featureSaga()]);
}
