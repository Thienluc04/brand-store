import { useAppDispatch, useAppSelector } from "app/hooks";
import { Subscribe } from "components/common";
import { Sidebar } from "components/common/Sidebar";
import { DropdownFilter } from "components/dropdown";
import { Pagination } from "components/pagination";
import {
  productActions,
  selectProductList,
  selectProductLoading,
  selectProductPagination,
  selectSearchQuery,
} from "features/product/productSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ListFilter } from "models";
import { ListProductRow } from "modules/product/LisProductRow";
import { ListProductCol } from "modules/product/ListProductCol";
import { ProductCol } from "modules/product/ProductCol";
import { ProductRow } from "modules/product/ProductRow";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FOUR_STAR, FIVE_STAR, THREE_STAR, TWO_STAR } from "utils";
import NotFoundPage from "./NotFoundPage";
import { useNavigate } from "react-router";

const { v4 } = require("uuid");

export interface ListPageProps {}

export default function ListPage(props: ListPageProps) {
  const dispatch = useAppDispatch();

  const [isColumn, setIsColumn] = useState(false);
  const [listFilter, setListFilter] = useState<ListFilter>();
  const [order, setOrder] = useState<number>(1);

  const productList = useAppSelector(selectProductList);
  const pagination = useAppSelector(selectProductPagination);
  const loading = useAppSelector(selectProductLoading);
  const searchQuery = useAppSelector(selectSearchQuery);

  const [listChoose, setListChoose] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(pagination._page);

  useEffect(() => {
    let query = "";
    if (listFilter?.category) {
      listFilter.category.forEach((item) => {
        query = query.concat("category=" + item.id + "&");
      });
    }
    if (listFilter?.features) {
      listFilter.features.forEach((item) => {
        query = query.concat("features=" + item.id + "&");
      });
    }
    if (listFilter?.stars) {
      listFilter.stars.forEach((item) => {
        query = query.concat("rating.number=" + item + "&");
      });
    }

    if (listFilter?.range) {
      const minPrice = listFilter.range.min;
      const maxPrice = listFilter.range.max;
      query = query.concat("price_gte=" + minPrice + "&price_lte=" + maxPrice);
    }

    if (order === 1) {
      query = query + "&_order=asc";
    } else if (order === 2) {
      query = query + "&_order=desc";
    }

    if (currentPage >= 1) {
      query = query + `&_page=${currentPage}`;
    }

    if (pagination._totalRows <= pagination._limit) {
      setCurrentPage(1);
    }

    if (searchQuery.length > 0) {
      query = query + `&name_like=${searchQuery}`;
    }

    dispatch(productActions.fetchProductQuery(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    listFilter?.category,
    listFilter?.features,
    listFilter?.stars,
    listFilter?.range,
    order,
    currentPage,
    pagination._totalRows,
    pagination._limit,
    searchQuery,
  ]);

  useEffect(() => {
    const list: string[] = [];

    listFilter?.category.forEach((item) => {
      list.push(item.name);
    });

    listFilter?.features.forEach((item) => {
      list.push(item.name);
    });

    listFilter?.stars.forEach((item) => {
      if (item === TWO_STAR) {
        list.push("2 star");
      }
      if (item === THREE_STAR) {
        list.push("3 star");
      }
      if (item === FOUR_STAR) {
        list.push("4 star");
      }
      if (item === FIVE_STAR) {
        list.push("5 star");
      }
    });
    setListChoose(list);
  }, [listFilter?.category, listFilter?.features, listFilter?.stars]);

  return (
    <>
      <div className="bg-[#F7FAFC] py-10 px-3">
        <div className="max-w-[1180px] mx-auto flex gap-5">
          <Sidebar listFilter={listFilter} setListFilter={setListFilter}></Sidebar>
          <div className="flex flex-1 flex-col gap-5">
            <div className="p-3 flex justify-between items-center bg-white border border-gray3 rounded-md">
              <div className="hidden xl:block">
                <span className="text-dark">
                  There are {productList.length} products matching the filter
                </span>
              </div>
              <div className="flex gap-[10px] items-center justify-between max-lg:flex-1">
                <DropdownFilter setOrder={setOrder}></DropdownFilter>
                <div className="flex items-center rounded-md border border-gray3">
                  <span
                    className={`p-2 cursor-pointer ${isColumn === false ? "bg-gray2" : "bg-white"}`}
                    onClick={() => setIsColumn(false)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 0H0V8H8V0Z" fill="#1C1C1C" />
                      <path d="M8 10H0V18H8V10Z" fill="#1C1C1C" />
                      <path d="M18 0H10V8H18V0Z" fill="#1C1C1C" />
                      <path d="M18 10H10V18H18V10Z" fill="#1C1C1C" />
                    </svg>
                  </span>
                  <div className="h-[34px] w-[2px] bg-gray3"></div>
                  <span
                    className={`p-2 cursor-pointer ${isColumn === true ? "bg-gray2" : "bg-white"}`}
                    onClick={() => setIsColumn(true)}
                  >
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 4H0V0H18V4ZM18 6H0V10H18V6ZM18 12H0V16H18V12Z" fill="#1C1C1C" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            {listChoose.length > 0 && (
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center flex-wrap  md:overflow-hidden max-md:max-w-[360px] hiddenScroll text-sm">
                  {listChoose.map((item, index) => (
                    <div
                      key={v4()}
                      className="py-1 px-2 border border-primary rounded-md bg-white text-gray6 flex items-center gap-2"
                    >
                      {item}
                      <span className="cursor-pointer max-lg:w-3">
                        <svg
                          width={12}
                          height={12}
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8334 1.34163L10.6584 0.166626L6.00008 4.82496L1.34175 0.166626L0.166748 1.34163L4.82508 5.99996L0.166748 10.6583L1.34175 11.8333L6.00008 7.17496L10.6584 11.8333L11.8334 10.6583L7.17508 5.99996L11.8334 1.34163Z"
                            fill="#8B96A5"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
                  <span
                    onClick={() => setListFilter({ category: [], features: [], stars: [] })}
                    className="text-primary cursor-pointer max-lg:hidden text-sm"
                  >
                    Clear all filter
                  </span>
                </div>
              </div>
            )}
            {listChoose.length > 0 && productList.length === 0 && (
              <div className="text-center">Sorry, there are no matching products</div>
            )}
            {isColumn ? (
              <ListProductCol>
                {!loading
                  ? productList.map((item, index) => (
                      <ProductCol
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        order={item.orders}
                        price={item.price}
                        rating={item.rating}
                        id={item.id}
                      ></ProductCol>
                    ))
                  : Array(6)
                      .fill(null)
                      .map((item, index) => (
                        <div key={v4()} className="flex p-4 border border-gray3 gap-5 bg-white">
                          <Skeleton width={198} height={198}></Skeleton>
                          <div className="flex flex-col gap-2 flex-1">
                            <Skeleton width={250} height={25}></Skeleton>
                            <Skeleton width={100} height={25}></Skeleton>
                            <Skeleton width={350}></Skeleton>
                            <Skeleton count={2}></Skeleton>
                            <Skeleton width={100}></Skeleton>
                          </div>
                          <Skeleton height={40} width={40}></Skeleton>
                        </div>
                      ))}
              </ListProductCol>
            ) : (
              <ListProductRow>
                {!loading
                  ? productList.map((item, index) => (
                      <ProductRow
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        rating={item.rating}
                        id={item.id}
                        description={item.description}
                      ></ProductRow>
                    ))
                  : Array(6)
                      .fill(null)
                      .map((item, index) => (
                        <div key={v4()} className="bg-white rounded-md p-1 flex flex-col gap-2">
                          <Skeleton className="xl:w-[200px] xl:h-[200px] w-[120px] h-[120px]"></Skeleton>
                          <div className="flex flex-col gap-1 pb-3 xl:text-left text-center">
                            <div className="flex justify-between">
                              <div>
                                <Skeleton width={100} height={20}></Skeleton>
                                <Skeleton width={80}></Skeleton>
                              </div>
                              <Skeleton width={40} height={40}></Skeleton>
                            </div>
                            <Skeleton width={150}></Skeleton>
                          </div>
                        </div>
                      ))}
              </ListProductRow>
            )}
            {productList.length > 0 && (
              <div className="ml-auto flex justify-end">
                <Pagination
                  page={currentPage}
                  setPage={setCurrentPage}
                  count={Math.ceil(pagination._totalRows / pagination._limit)}
                ></Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
      <Subscribe></Subscribe>
    </>
  );
}
