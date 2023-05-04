import { Dispatch, SetStateAction } from "react";

export interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  count: number;
}

export function Pagination({ page, setPage, count }: PaginationProps) {
  const handleSetPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSetNextPage = () => {
    if (page < count) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex">
      <div
        className={`border  border-gray3 bg-white rounded-l-lg h-10 w-11 flex items-center justify-center ${
          page === 1 ? "text-gray5" : " cursor-pointer"
        }`}
        onClick={handleSetPrevPage}
      >
        <svg
          width={8}
          height={14}
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.64465 0.366443C7.17084 -0.122148 6.40547 -0.122148 5.93166 0.366443L0.355353 6.11678C-0.118451 6.60537 -0.118451 7.39463 0.355353 7.88322L5.93166 13.6336C6.40547 14.1221 7.17084 14.1221 7.64465 13.6336C8.11845 13.145 8.11845 12.3557 7.64465 11.8671L2.9309 6.99374L7.64465 2.13289C8.11845 1.6443 8.1063 0.842506 7.64465 0.366443Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {Array(count)
        .fill(0)
        .map((item, index) => (
          <div
            key={index}
            className={`border border-gray3 h-10 w-11  flex items-center justify-center ${
              page === index + 1 ? "bg-gray2 text-gray5" : "bg-white cursor-pointer"
            }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      <div
        className={`border border-gray3 bg-white rounded-r-lg h-10 w-11 flex items-center justify-center ${
          page >= count ? "text-gray5" : " cursor-pointer"
        }`}
        onClick={handleSetNextPage}
      >
        <svg
          width={8}
          height={14}
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.355353 0.368312C-0.118451 0.857285 -0.118451 1.64716 0.355353 2.13614L5.0691 7.00079L0.355353 11.8654C-0.118451 12.3544 -0.118451 13.1443 0.355353 13.6333C0.829157 14.1222 1.59453 14.1222 2.06834 13.6333L7.64465 7.87843C8.11845 7.38946 8.11845 6.59958 7.64465 6.11061L2.06834 0.355774C1.60668 -0.120661 0.829157 -0.120661 0.355353 0.368312Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
