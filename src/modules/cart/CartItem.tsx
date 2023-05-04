import { Quantity } from "components/common";
import { Cart } from "models";
import * as React from "react";

export interface CartItemProps {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

export function CartItem({ id, image, name, description, price }: CartItemProps) {
  const handleRemoveCartItem = () => {
    const myCart: Array<Cart> = Array.from(JSON.parse(String(localStorage.getItem("my_cart"))));
    const cartFilter = myCart.filter((item) => item.id !== id);
    localStorage.setItem("my_cart", JSON.stringify(cartFilter));
    window.location.reload();
  };

  return (
    <div className="pb-5 border-b border-b-gray3 flex justify-between max-md:flex-col max-md:justify-center">
      <div className="flex items-center gap-3">
        <div className="p-1 border border-gray3 rounded-md">
          <img src={image} alt="" className="w-[150px] h-[150px]" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-dark font-semibold">{name}</h2>
          <p className="text-gray5 max-w-[400px] descShort">{description}</p>
          <button
            onClick={handleRemoveCartItem}
            className="text-[#FA3434] w-[70px] h-[30px] border border-gray3 rounded-md shadow-sm font-medium text-sm"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="max-md:flex max-md:justify-between max-md:items-center">
        <p className="text-dark font-medium mb-2 text-right max-md:mb-0">${price}</p>
        <Quantity small></Quantity>
      </div>
    </div>
  );
}
