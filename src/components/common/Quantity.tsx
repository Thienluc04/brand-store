import { useState } from "react";

export interface QuantityProps {
  small?: boolean;
}

export function Quantity({ small }: QuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const quantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const quantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="flex items-center">
      <button
        className={`hover:bg-primary hover:text-white transition-all ${
          small ? "max-w-[30px] h-7" : "max-w-[45px] h-9"
        } py-1 px-4 border border-primary border-r-0 text-primary rounded-l-md text-2xl flex justify-center items-center`}
        onClick={() => quantityDecrement()}
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className={`text-center ${
          small ? "max-w-[40px] h-7" : "max-w-[60px] h-9"
        } border border-primary`}
      />
      <button
        className={`hover:bg-primary hover:text-white transition-all ${
          small ? "max-w-[30px] h-7" : "max-w-[45px] h-9"
        } py-1 px-4 border border-primary border-l-0 text-primary rounded-r-md text-2xl flex justify-center items-center`}
        onClick={() => quantityIncrement()}
      >
        +
      </button>
    </div>
  );
}
