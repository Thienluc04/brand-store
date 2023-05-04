import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface DropdownFilterProps {
  setOrder: Dispatch<SetStateAction<number>>;
}

export function DropdownFilter({ setOrder }: DropdownFilterProps) {
  const array = [
    { id: 1, name: "Price ascending" },
    { id: 2, name: "Price descending" },
  ];

  const dropRef = useRef<HTMLDivElement>(null);

  const [currentOrder, setCurrentOrder] = useState<string>(array[0].name);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  useEffect(() => {
    if (isHidden) {
      if (dropRef.current) {
        const dropElement = dropRef.current;
        dropElement.classList.add("hidden");
      }
    } else {
      if (dropRef.current) {
        const dropElement = dropRef.current;
        dropElement.classList.remove("hidden");
      }
    }
  }, [isHidden]);

  const handleToggleDropdown = () => {
    setIsHidden(!isHidden);
  };

  const handleChooseMode = (name: string, id: number) => {
    setCurrentOrder(name);
    setIsHidden(!isHidden);
    setOrder(id);
  };

  return (
    <div
      onClick={handleToggleDropdown}
      className="relative py-[5px] px-3 w-[172px] border border-gray3 rounded-md flex items-center justify-between cursor-pointer"
    >
      <span>{currentOrder}</span>
      <img src="/images/arrow-down.svg" alt="" />
      <div
        ref={dropRef}
        className="hidden absolute bg-white top-full left-0 w-[172px] border border-gray3 rounded-md"
      >
        <div className="flex flex-col py-2 gap-2">
          {array.map((item) => (
            <span
              key={item.id}
              className="px-3 hover:text-primary"
              onClick={() => handleChooseMode(item.name, item.id)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
