import { PropsWithChildren } from "react";

export interface ListProductColProps {}

export function ListProductCol({
  children,
}: PropsWithChildren<ListProductColProps>) {
  return <div className="flex flex-col gap-[10px]">{children}</div>;
}
