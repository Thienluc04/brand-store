import { Children, PropsWithChildren } from "react";

export interface RadioProps {
  checked: boolean;
  name: string;
}

export function Radio({
  checked,
  name,
  children,
}: PropsWithChildren<RadioProps>) {
  return (
    <label className="cursor-pointer">
      <div className="flex gap-2 items-center">
        <input type="radio" checked={checked} name={name} className="w-0 h-0" />
        <div
          className={`flex justify-center items-center h-5 w-5 rounded-full bg-white  ${
            checked ? "border-2 border-primary " : "border-2 border-[#979797]"
          }`}
        >
          <div
            className={`${checked ? "h-3 w-3 bg-primary rounded-full" : ""}`}
          ></div>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
}
