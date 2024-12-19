import React from "react";

const Offers: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full mx-0 overflow-hidden rounded-2xl">
      {" "}
      {/* Set container size */}
      <img
        className="block object-cover"
        src={"/images/promocode.webp"}
        alt=""
      />
    </div>
  );
};

export default Offers;
