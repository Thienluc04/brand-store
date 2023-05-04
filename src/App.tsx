import { MainLayout } from "./components/layout/MainLayout";
import { Route, Routes } from "react-router";
import "./App.scss";
import HomePage from "./pages/HomePage";
import ListPage from "pages/ListPage";
import DetailPage from "pages/DetailPage";
import NotFoundPage from "pages/NotFoundPage";
import CartPage from "pages/CartPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect } from "react";

const config = {
  apiKey: "AIzaSyDXxNvsiIyFNafD4QQZP9vl9T0vtLrUdo0",
  authDomain: "brand-store-701aa.firebaseapp.com",
};
firebase.initializeApp(config);

function App() {
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user.displayName);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/products" element={<ListPage></ListPage>}></Route>
          <Route path="/products/:productId" element={<DetailPage></DetailPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
