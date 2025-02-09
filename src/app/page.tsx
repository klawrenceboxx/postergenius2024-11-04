"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import CategorySection from "@/components/CategorySection";

export type CountryData = {
  name: string;
  region: string;
  city: string;
};

// const fetchCountry = async (): Promise<CountryData> => {
//   try {
//     const res = await fetch(
//       "https://api.ipregistry.co/?key=ira_wz5qeU9B07BN0m65TypWKvD1ZA8cdl03KDbF",
//       { cache: "no-store" } // Ensures fresh data for every request
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch data: ${res.statusText}`);
//     }

//     const data = await res.json();
//     return {
//       name: data.location?.country?.name || "Unavailable",
//       region: data.location?.region?.name || "Unavailable",
//       city: data.location?.city || "Unavailable",
//     };
//   } catch (error) {
//     console.error("Error fetching country data:", error);
//     return { name: "Unavailable", region: "Unavailable", city: "Unavailable" };
//   }
// };

export default function Home() {
  const [country, setCountry] = useState<CountryData>({
    name: "Unavailable",
    region: "Unavailable",
    city: "Unavailable",
  });

  const { data: session, status } = useSession();
  console.log(session);

  // useEffect(() => {
  //   const getCountry = async () => {
  //     const fetchedCountry = await fetchCountry();
  //     setCountry(fetchedCountry);
  //   };
  //   getCountry();
  // }, []);

  // if (session) {

  return (
    <div>
      <Header country={country} />
      <p className="text-lg font-semibold text-gray-700">
        {/* Signed in as {session.user?.email} <br /> */}
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        Country: {country.name}
      </p>
      {status === "loading" ? (
        <p>Loading session...</p>
      ) : session ? (
        <>
          <p>You are logged in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      <Main />
      <FlashDeals />
      <CategorySection />

      <Footer country={country} />
    </div>
  );
}
// return (
//   <>
//     Not signed in <br />
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// );
// };
