import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import categoryReducer from "features/category/categorySlice";
import productReducer from "features/product/productSlice";
import featureReducer from "features/feature/featureSlice";
import cartReducer from "features/cart/cartSlice";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const rootReducer = combineReducers({
  router: routerReducer,
  category: categoryReducer,
  product: productReducer,
  feature: featureReducer,
  cart: cartReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
