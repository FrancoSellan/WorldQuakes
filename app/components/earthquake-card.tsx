import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button
} from "@/app/components/ui";
import type { Earthquake } from "@/app/lib/earthquakes/models";

type EarthquakeCardProps = {
  earthquake: Earthquake;
  onClose: () => void;
};

export function EarthquakeCard({ earthquake, onClose }: EarthquakeCardProps) {
  const time = new Date(earthquake.time).toLocaleString();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {earthquake.magnitude !== null
            ? `M ${earthquake.magnitude.toFixed(1)}`
            : "Magnitud desconocida"}
        </CardTitle>
        <CardDescription>{earthquake.place ?? "Ubicación desconocida"}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{time}</p>
        <p className="text-sm text-muted-foreground">
          Profundidad: {earthquake.coordinates.depth} km
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          className="w-full"
          render={<a href={earthquake.url} target="_blank" rel="noreferrer" />}
        >
          Ver en USGS
        </Button>
        <Button variant="outline" className="w-full" onClick={onClose}>
          Cerrar
        </Button>
      </CardFooter>
    </Card>
  );
}
