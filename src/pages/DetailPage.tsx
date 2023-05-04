import featuresApi from "api/featuresApi";
import productApi from "api/productApi";
import { Button } from "components/button";
import { DiscountBanner, Quantity } from "components/common";
import { Cart, Product } from "models";
import { Features } from "models/features";
import { ProductRow } from "modules/product/ProductRow";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const { v4 } = require("uuid");

export interface DetailPageProps {}

export default function DetailPage(props: DetailPageProps) {
  useEffect(() => {
    document.title = "Brand Store Detail";
  }, []);

  const [product, setProduct] = useState<Product>();
  const [feature, setFeature] = useState<Features>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();

  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    if (productId) {
      (async () => {
        try {
          const data: Product = await productApi.getById(Number(productId));
          setProduct(data);
        } catch (error) {
          console.log("Error: ", error);
        }
      })();
    }
  }, [productId]);

  useEffect(() => {
    (async () => {
      if (product) {
        try {
          const data: Features = await featuresApi.getById(product?.features);
          setFeature(data);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })();
  }, [product]);

  useEffect(() => {
    (async () => {
      if (product) {
        try {
          const data: Product[] = await productApi.getListByCategory(product?.category);
          setRelatedProducts(data);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    })();
  }, [product]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.displayName) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
    });
  }, [auth]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.warning("You are not logged in !");
      navigate("/login");
      return;
    }

    const mycart = localStorage.getItem("my_cart");
    if (product) {
      if (mycart) {
        let isHasItem = false;
        const arrayPrev: Array<Cart> = Array.from(JSON.parse(mycart));
        arrayPrev.forEach((item) => {
          if (item.id === product?.id) {
            isHasItem = true;
          }
        });

        if (!isHasItem) {
          const newArray: Array<Cart> = [
            ...arrayPrev,
            {
              id: product.id,
              image: product.image,
              name: product.name,
              price: product.price,
              description: product.description,
            },
          ];
          localStorage.setItem("my_cart", JSON.stringify(newArray));
          window.location.reload();
        }
      } else {
        const addCart = [
          {
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            description: product.description,
          },
        ];
        localStorage.setItem("my_cart", JSON.stringify(addCart));
        window.location.reload();
      }
    }
  };

  return (
    <div className="bg-[#F7FAFC] py-10">
      <div className="max-w-[1180px] mx-auto flex flex-col gap-10 max-lg:px-3">
        <div className="bg-white border border-gray3 p-5 flex gap-5 rounded-md max-md:flex-col max-lg:justify-center max-lg:items-center">
          {product ? (
            <div className="border border-gray3 rounded-md p-2">
              <img
                src={product?.image}
                alt=""
                width={380}
                height={380}
                className="rounded-md max-lg:max-w-[200px] max-lg:max-h-[200px]"
              />
            </div>
          ) : (
            <Skeleton height={380} width={380}></Skeleton>
          )}
          <div className="flex flex-col gap-2 mt-10 max-lg:mt-0">
            {product ? (
              <p className="text-xl font-semibold leading-7 text-dark max-lg:text-lg max-lg:leading-6 max-lg:text-center">
                {product?.name}
              </p>
            ) : (
              <Skeleton width={200}></Skeleton>
            )}
            {product ? (
              <div className="flex items-center gap-2">
                <img src={product?.rating.image} alt="" className="max-lg:w-[80px]" />
                <span className="text-[#FF9017]">{product?.rating.number}</span>
                <div className="w-[6px] h-[6px] bg-[#DBDBDB] rounded-full"></div>
                <p className="text-gray5">{product?.orders} orders</p>
                <div className="w-[6px] h-[6px] bg-[#DBDBDB] rounded-full"></div>
                <span className="text-[#00B517]">Free Shipping</span>
              </div>
            ) : (
              <Skeleton width={300}></Skeleton>
            )}

            <div className="mt-5">
              {product ? (
                <p className="text-[#FA3434] bg-[#FFF0DF] p-3 inline rounded-md">
                  ${product?.price}
                </p>
              ) : (
                <Skeleton width={80} height={40}></Skeleton>
              )}
            </div>
            <div className="mt-5">
              {product ? <Quantity></Quantity> : <Skeleton width={150} height={35}></Skeleton>}
            </div>
            <div className="flex mt-5 gap-5">
              {product ? (
                <>
                  <Button onClick={handleAddToCart} kind="primary">
                    Add to cart
                  </Button>
                  <Button to="/cart" kind="secondary">
                    Buy now
                  </Button>
                </>
              ) : (
                <Skeleton width={200} height={40}></Skeleton>
              )}
            </div>
          </div>
        </div>
        <div className="p-5 border flex flex-col border-gray3 rounded-md gap-5  bg-white">
          {product ? (
            <>
              <div className="flex gap-5">
                <span className="flex xl:w-[100px] text-primary">Features:</span>
                <span className="text-gray5">{feature?.name}</span>
              </div>
              <div className="flex gap-5 max-lg:flex-col">
                <p className="w-[100px] text-primary">Description:</p>
                <p className="text-gray5 flex-1 max-lg:text-center">{product?.description}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-5">
                <Skeleton width={100}></Skeleton>
                <Skeleton width={100}></Skeleton>
              </div>
              <div className="flex gap-5 max-lg:flex-col">
                <Skeleton width={100}></Skeleton>
                <div className="flex-1">
                  <Skeleton className="w-full" count={5}></Skeleton>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-5 border border-gray3 rounded-md bg-white">
          {product ? (
            <h1 className="text-xl font-semibold text-dark mb-4">Related products</h1>
          ) : (
            <Skeleton width={200} height={25} className="mb-4"></Skeleton>
          )}
          <div className="flex gap-5 max-lg:grid max-lg:grid-cols-2">
            {relatedProducts
              ? relatedProducts?.map((item, index) => {
                  if (index < 5 && item.id !== product?.id) {
                    return (
                      <ProductRow
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        rating={item.rating}
                        id={item.id}
                        description={item.description}
                      ></ProductRow>
                    );
                  }
                })
              : Array(5)
                  .fill(null)
                  .map((item, index) => (
                    <div key={v4()} className="max-lg:w-full ">
                      <div className="flex max-lg:justify-center justify-center">
                        <div className="xl:block hidden">
                          <Skeleton width={210} height={210}></Skeleton>
                        </div>
                        <div className="max-lg:block max-md:hidden hidden">
                          <Skeleton width={300} height={300}></Skeleton>
                        </div>
                        <div className="max-md:block hidden">
                          <Skeleton width={140} height={140}></Skeleton>
                        </div>
                      </div>
                      <div className="my-4 w-full h-[1px] bg-gray2"></div>
                      <div className="flex justify-between max-md:relative">
                        <div className="flex-1">
                          <div className="block pr-2">
                            <Skeleton width={120}></Skeleton>
                          </div>
                          <Skeleton width={100}></Skeleton>
                          <div className="flex items-center gap-2 mb-2 max-md:gap-1">
                            <Skeleton className="w-[100px] max-md:[60px]"></Skeleton>
                            <Skeleton width={50}></Skeleton>
                          </div>
                        </div>
                        <div className="xl:flex hidden justify-center items-center w-10 h-10 max-md:absolute right-2 ">
                          <Skeleton width={40} height={40}></Skeleton>
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </div>
        <DiscountBanner></DiscountBanner>
      </div>
    </div>
  );
}
