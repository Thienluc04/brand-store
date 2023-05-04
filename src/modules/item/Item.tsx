import * as React from "react";
import { Link } from "react-router-dom";

export interface ItemProps {
  image: string;
  price: number;
  description: string;
  id: number;
  name: string;
}

export function Item({ image, price, description, id, name }: ItemProps) {
  return (
    <Link to={`/products/${id}`} title={name}>
      <div className="border border-[#E0E0E0] rounded-md bg-white pt-1">
        <img src={image} alt="" className="xl:max-w-[200px] max-w-[120px] mx-auto mb-3" />
        <div className="flex flex-col gap-1 px-4 pb-3 xl:text-left text-center">
          <h2 className="text-dark font-semibold leading-[22px]">${price}</h2>
          <p className="text-gray5 descShort">{description}</p>
        </div>
      </div>
    </Link>
  );
}
