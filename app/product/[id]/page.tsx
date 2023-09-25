import { singleProduct } from "@/data";
import Image from "next/image";
import React from "react";

const SingleProduct = () => {
  return (
    <div className="p-2 lg:px-5 xl:px-15 h-screen flex flex-col justify-around text-red-500 md:flex-row">
      {singleProduct.img && (
        <div className="relative">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
