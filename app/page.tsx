import Header from "./components/header/index";
import Footer from "./components/footer/index";

// Server Component: Fetch data directly

//custom type to satisfy Typescript. if you ever want to acquire more stuff from this api in the future, modify this type
// type countryData = {
//   name: string;
//   region: string;
//   city: string;
//   timezone: number;
// };

// Fetch the country data
const fetchCountry = async (): Promise<string> => {
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
    // const countryData = {
    //   name: data.location.country.name,
    //   region: data.location.region.name,
    //   city: data.location.city,
    //   timezone: data.location.timezone.id,
    // };

    // Log the parsed JSON to the console
    console.log("IPRegistry Data:", data);

    return data.location.country.name || "Unavailable";
  } catch (error) {
    console.error("Error fetching country data:", error);
    return "Unavailable";
  }
};

const Home = async () => {
  const country = await fetchCountry();

  return (
    <div>
      <Header />
      <p className="text-lg font-semibold text-gray-700">Country: {country}</p>
      <Footer />
    </div>
  );
};

export default Home;
