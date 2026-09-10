import type {
  Earthquake,
  UsgsFeedResponse,
} from "@/app/lib/earthquakes/models/";

const USGS_FEED_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export async function fetchEarthquakes(): Promise<Earthquake[]> {
  const response = await fetch(USGS_FEED_URL, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`USGS respondió con estado ${response.status}`);
  }

  const geojson: UsgsFeedResponse = await response.json();

  return geojson.features.map((feature) => {
    const [lon, lat, depth] = feature.geometry.coordinates;

    return {
      id: feature.id,
      type: "earthquake",
      magnitude: feature.properties.mag,
      place: feature.properties.place,
      time: new Date(feature.properties.time).toISOString(),
      coordinates: { lat, lon, depth },
      url: feature.properties.url,
    };
  });
}
