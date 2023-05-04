import { Common } from "models";
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";

export interface CheckboxProps {
  id: number;
  name: string;
  listChecked: Common[];
  setChecked: Dispatch<SetStateAction<Common[]>>;
  checked: boolean;
}

export function Checkbox({
  id,
  name = "",
  children,
  setChecked,
  listChecked = [],
  checked,
}: PropsWithChildren<CheckboxProps>) {
  const [isChecked, setIsChecked] = useState(false);
  const listId: number[] = [];

  useEffect(() => {
    listChecked.forEach((item) => {
      if (item.id === id) {
        setIsChecked(true);
      }
      listId.push(item.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, listChecked]);

  const handleChecked = (id: number) => {
    if (isChecked) {
      setIsChecked(false);
      setChecked(listChecked.filter((item) => item.id !== id));
    } else {
      setChecked((prev) => [...prev, { id, name }]);
    }
  };

  useEffect(() => {
    if (checked) {
      setIsChecked(false);
    }
  }, [checked]);

  return (
    <label className="cursor-pointer">
      <div className="flex gap-2 items-center">
        <input
          checked={listId.includes(id)}
          type="checkbox"
          className="invisible h-1 w-[-1px] absolute"
          onChange={() => handleChecked(id)}
        />
        <div
          className={`flex justify-center items-center w-5 h-5  rounded-md ${
            isChecked ? "bg-primary border-none" : "border-2 border-[#BDBDBD] bg-white"
          }`}
        >
          <svg
            width={13}
            height={9}
            viewBox="0 0 13 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.64286 9L0 4.67308L1.3 3.46154L4.64286 6.57692L11.7 0L13 1.21154L4.64286 9Z"
              fill="white"
            />
          </svg>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
}
