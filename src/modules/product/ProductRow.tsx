import { useAppDispatch } from "app/hooks";
import { cartAction } from "features/cart/cartSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Cart } from "models";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ProductRowProps {
  image: string;
  name: string;
  price: number;
  rating: {
    number: number;
    image: string;
  };
  id: number;
  description: string;
}

export function ProductRow({
  image,
  name,
  price,
  rating = { number: 0, image: "" },
  id,
  description,
}: ProductRowProps) {
  const [addToCart, setAddToCart] = useState(false);
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
    setAddToCart(!addToCart);
    if (!addToCart) {
      const mycart = localStorage.getItem("my_cart");
      if (mycart) {
        let isHasItem = false;
        const arrayPrev: Array<Cart> = Array.from(JSON.parse(mycart));
        arrayPrev.forEach((item) => {
          if (item.id === id) {
            isHasItem = true;
          }
        });

        if (!isHasItem) {
          const newArray: Array<Cart> = [...arrayPrev, { id, image, name, price, description }];
          localStorage.setItem("my_cart", JSON.stringify(newArray));
          // const cartLength = Array.from(JSON.parse(String(localStorage.getItem("my_cart")))).length;
          // dispatch(cartAction.updateCartLength(cartLength));
          window.location.reload();
        }
      } else {
        const addCart = [{ id, image, name, price, description }];
        localStorage.setItem("my_cart", JSON.stringify(addCart));
        // const cartLength = Array.from(JSON.parse(String(localStorage.getItem("my_cart")))).length;
        // dispatch(cartAction.updateCartLength(cartLength));
        window.location.reload();
      }
    }
  };

  return (
    <div
      className="p-3 max-lg:w-full bg-white rounded-md border border-gray3 max-md:p-2"
      title={name}
    >
      <Link
        to={`/products/${id}`}
        className="max-md:w-[140px] max-md:h-[140px] flex max-lg:justify-center justify-center"
      >
        <img
          src={image}
          alt=""
          className="max-md:max-w-[140px] max-md:max-h-[140px] w-[200px] h-[200px]"
        />
      </Link>
      <div className="my-4 w-full h-[1px] bg-gray2"></div>
      <div className="flex justify-between max-md:relative">
        <div className="flex-1">
          <Link
            to={"/products/1"}
            className="text-dark max-md:text-base font-semibold text-lg w-[180px] block pr-2"
          >
            {name}
          </Link>
          <p className="text-dark text-lg max-md:text-base">${price}</p>
          <div className="flex items-center gap-2 mb-2 max-md:gap-1">
            <img src={rating.image} alt="" className="max-md:max-w-[60px]" />
            <span className="text-[#FF9017]">{rating.number}</span>
          </div>
        </div>
        <div
          className="xl:flex hidden justify-center items-center rounded-md border border-gray3 w-10 h-10 cursor-pointer text-primary max-md:absolute bg-white right-2 "
          onClick={handleAddToCart}
        >
          <span title="Add to cart">
            {addToCart ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
