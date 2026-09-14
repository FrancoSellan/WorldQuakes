import Map from "./components/map";
import { fetchEarthquakes } from "@/app/lib/earthquakes/service";

export default async function Home() {
  const earthquakes = await fetchEarthquakes();

  return (
    <div className="relative flex-1 w-full">
      <Map earthquakes={earthquakes} />
    </div>
  );
}
