"use client";

import Header from "../components/header/index";
import Footer from "../components/footer/index";
import { useSession, signIn, signOut } from "next-auth/react";

// Server Component: Fetch data directly

//custom type to satisfy Typescript. if you ever want to acquire more stuff from this api in the future, modify this type
export type countryData = {
  name: string;
  region: string;
  city: string;
};

// Fetch the country data
const fetchCountry = async (): Promise<countryData> => {
  try {
    const res = await fetch(
      "https://api.ipregistry.co/?key=ira_wz5qeU9B07BN0m65TypWKvD1ZA8cdl03KDbF",
      { cache: "no-store" } // Ensures fresh data for every request
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();

    // Extract additional data
    const countryData = await {
      name: data.location.country.name,
      region: data.location.region.name,
      city: data.location.city,
    };

    // Log the parsed JSON to the console
    console.log("IPRegistry Data:", data);

    return countryData || "Unavailable";
  } catch (error) {
    console.error("Error fetching country data:", error);

    return {
      name: "Unavailable",
      region: "Unavailable",
      city: "Unavailable",
    };
  }
};

const Home = async () => {
  const country = await fetchCountry();
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <Header country={country} />
        <p className="text-lg font-semibold text-gray-700">
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
          Country: {country.name}
        </p>
        <Footer country={country} />
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Home;
