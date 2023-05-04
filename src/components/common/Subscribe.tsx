import { Button } from "components/button";
import * as React from "react";

export interface SubscribeProps {}

export function Subscribe(props: SubscribeProps) {
  return (
    <div className=" bg-[#EFF2F4] xl:mt-0 mt-5">
      <div className="xl:py-10 py-5 max-w-[1180px] mx-auto flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold leading-7">
          Subscribe on our newsletter
        </h1>
        <p className="#606060 mb-5 text-center px-5">
          Get daily news on upcoming offers from many suppliers all over the
          world
        </p>
        <div className="flex xl:flex-row flex-col items-center gap-2">
          <div className="py-2 px-3 flex bg-white rounded-md border border-[#DEE2E7]">
            <img src="/images/email.png" alt="" />
            <input
              type="text"
              placeholder="Email"
              className="outline-none pl-3"
            />
          </div>
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
