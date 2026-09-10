export interface Earthquake {
  id: string;
  type: "earthquake";
  magnitude: number | null;
  place: string | null;
  time: string;
  coordinates: {
    lat: number;
    lon: number;
    depth: number;
  };
  url: string;
}
