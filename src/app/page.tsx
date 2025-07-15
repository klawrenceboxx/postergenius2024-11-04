import db from "@/utils/db";
import { PosterModel } from "@/models/Posters";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ClientHome from "@/app/clientHome";

export default async function Home() {
  // 1. Connect to the DB and fetch poster data
  await db.connectDb();
  let rawPosters = [] as any[];
  if (process.env.MONGODB_URL) {
    try {
      rawPosters = await PosterModel.find().sort({ createdAt: -1 }).lean();
    } catch (err) {
      console.error("Error fetching posters from MongoDB", err);
    }
  }
  await db.disconnectDb();

  // Convert any Mongoose objects (like ObjectIds) into plain objects
  const posters = JSON.parse(JSON.stringify(rawPosters));

  // 2. Fetch IP data (country)
  let country = {
    name: "Unavailable",
    region: "Unavailable",
    city: "Unavailable",
  };

  try {
    const ipRes = await fetch(
      "https://api.ipregistry.co/?key=YOUR_API_KEY", // Replace with your key
      { next: { revalidate: 86400 } }
    );
    if (ipRes.ok) {
      const data = await ipRes.json();
      country = {
        name: data.location?.country?.name || "Unavailable",
        region: data.location?.region?.name || "Unavailable",
        city: data.location?.city || "Unavailable",
      };
    }
  } catch (err) {
    console.error("Error fetching IP data", err);
  }

  // 3. Get the session (can be null if not logged in)
  const session = await getServerSession(options);

  // 4. Render the client component; it will handle its own loading state
  return (
    <ClientHome
      serverSession={session}
      serverCountry={country}
      serverProducts={posters}
    />
  );
}
