export interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  return (
    <div className={`border-t border-b border-gray3 px-5 xl:block hidden ${className}`}>
      <div className="flex items-center justify-between py-4 max-w-[1180px] mx-auto">
        <div className="flex gap-4">
          <img src="/images/menu-icon.svg" alt="" />
          <a href="/products" className="flex gap-2">
            List Products
          </a>
        </div>
        <div className="flex gap-8">
          <div className="flex gap-2">
            <span>English, USD</span>
            <img src="/images/arrow-down.svg" alt="" />
          </div>
          <div className="flex gap-2">
            <span>Ship to</span>
            <img src="/images/germany-flag.svg" alt="" />
            <img src="/images/arrow-down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
