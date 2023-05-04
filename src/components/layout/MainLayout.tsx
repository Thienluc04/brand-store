import { useAppDispatch } from "app/hooks";
import { Footer, Header } from "components/common";
import { categoryAction } from "features/category/categorySlice";
import { featureAction } from "features/feature/featureSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export interface MainLayoutProps {}

export function MainLayout(props: MainLayoutProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoryAction.fetchCategoryList());
    dispatch(featureAction.fetchFeatureList());
  }, [dispatch]);

  return (
    <div className="relative">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
