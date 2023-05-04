import { PropsWithChildren } from "react";

export interface ListProductRowProps {
  className?: string;
}

export function ListProductRow({
  className = "",
  children,
}: PropsWithChildren<ListProductRowProps>) {
  return (
    <div
      className={`grid grid-cols-3 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:max-w-[100vw] max-md:gap-2 ${className}`}
    >
      {children}
    </div>
  );
}
