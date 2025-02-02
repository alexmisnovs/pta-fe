"use client";
import CountriesList from "@/components/ContriesList";
// import Image from "next/image";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Countries</h1>
      <CountriesList />
    </main>
  );
}
