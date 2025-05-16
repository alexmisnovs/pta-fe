"use client";
// import Link from "next/link";
// import Image from "next/image";

import { TotalDonationsBlock } from "@/types/blocks";

const TotalDonations = ({ text, total, donationLink }: TotalDonationsBlock) => {
  return (
    <div className="container">
      <h2 className="text-3xl font-bold text-white text-center my-8">
        {text} : <span className="text-custom-red">£{total}</span>
      </h2>
      <div className="flex justify-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={donationLink?.link ?? "/"}
          className="flex 1 btn btn-md bg-custom-red hover:bg-gray text-white font-bold rounded px-4 border-0"
        >
          {donationLink?.buttonText ?? "Donate"}
        </a>
      </div>
    </div>
  );
};

export default TotalDonations;
