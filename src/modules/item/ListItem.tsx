import * as React from "react";

export interface ListItemProps {
  className?: string;
}

export function ListItem({ className = "", children }: React.PropsWithChildren<ListItemProps>) {
  return <div className={`grid xl:grid-cols-5 grid-cols-2 gap-5 ${className}`}>{children}</div>;
}
