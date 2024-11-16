// lib/fetchCountry.ts
export async function fetchCountry(ip: string) {
  try {
    const response = await fetch(
      `https://api.ipregistry.co/${ip}?key=ira_wz5qeU9B07BN0m65TypWKvD1ZA8cdl03KDbF`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country");
    }
    const data = await response.json();
    return data.location.country;
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
}
