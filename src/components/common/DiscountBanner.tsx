import { Link } from "react-router-dom";

export interface DiscountBannerProps {}

export function DiscountBanner(props: DiscountBannerProps) {
  return (
    <div className="h-[120px] bg-[#005ADE] rounded-lg relative max-lg:hidden">
      <img
        src="/images/discount-banner.png"
        alt=""
        className="absolute top-0 left-0"
      />
      <div className="absolute left-[30px] top-7 z-10">
        <h1 className="text-2xl font-semibold text-white">
          Super discount on more than 100 USD
        </h1>
        <p className="text-white">
          Have you ever finally just write dummy info
        </p>
      </div>
      <Link
        to={"/products"}
        className="absolute right-[30px] top-2/4 -translate-y-2/4 h-10 w-[110px] bg-[#FF9017] text-white rounded-md flex items-center justify-center font-medium"
      >
        Shop now
      </Link>
    </div>
  );
}
