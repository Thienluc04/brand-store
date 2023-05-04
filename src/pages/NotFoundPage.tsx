import { useEffect } from "react";

export interface INotFoundPageProps {}

export default function NotFoundPage(props: INotFoundPageProps) {
  useEffect(() => {
    document.title = "Not Found";
  }, []);
  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5">
      <img src="/images/not-found.png" alt="" />
      <p>This page could not be found</p>
    </div>
  );
}
