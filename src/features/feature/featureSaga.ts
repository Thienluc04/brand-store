import featuresApi from "api/featuresApi";
import { ListResponse } from "models";
import { Features } from "models/features";
import { call, put, takeLatest } from "redux-saga/effects";
import { featureAction } from "./featureSlice";

function* fetchFeatureList() {
  try {
    const response: ListResponse<Features> = yield call(featuresApi.getAll);
    yield put(featureAction.fetchFeatureListSuccess(response));
  } catch (error) {
    console.log("Failed to fetch feature list ", error);
  }
}

export default function* featureSaga() {
  yield takeLatest(featureAction.fetchFeatureList.type, fetchFeatureList);
}
