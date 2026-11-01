export interface NotionData {
  email: string;
  language: string;
  country: string;
}

export async function submitToNotion(data: NotionData): Promise<void> {
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        language: data.language,
        country: data.country,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit Notion");
    }
  } catch (error) {
    console.error("Error submitting to Notion:", error);
    throw error;
  }
}

export async function getUserLocation(): Promise<{
  country: string;
}> {
  try {
    // Both lookups are best-effort: a slow or blocked third party must not
    // stall the signup, so each gives up after 3s and falls to the catch below.
    const ipResponse = await fetch("https://api.ipify.org?format=json", {
      signal: AbortSignal.timeout(3000),
    });
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(3000),
    });
    const geoData = await geoResponse.json();

    return {
      country: geoData.country_name || "Unknown",
    };
  } catch (error) {
    console.error("Error getting user location:", error);
    return {
      country: "Unknown",
    };
  }
}
