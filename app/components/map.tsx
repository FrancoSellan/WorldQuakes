"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Earthquake } from "@/app/lib/earthquakes/models";
import { EarthquakeCard } from "./earthquake-card";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

type MapProps = {
  earthquakes: Earthquake[];
};

export default function Map({ earthquakes }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedEarthquake, setSelectedEarthquake] =
    useState<Earthquake | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/francosellan/cmu1e3ip000yj01qo8g408bis",
      projection: "globe",
      zoom: 1,
      center: [30, 15],
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl());

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = earthquakes.map((earthquake) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([earthquake.coordinates.lon, earthquake.coordinates.lat])
        .addTo(map);

      marker.getElement().style.cursor = "pointer";
      marker.getElement().addEventListener("click", (event) => {
        event.stopPropagation();
        setSelectedEarthquake(earthquake);
      });

      return marker;
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [earthquakes]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full" />
      {selectedEarthquake && (
        <div className="absolute top-4 right-4 z-10">
          <EarthquakeCard
            earthquake={selectedEarthquake}
            onClose={() => setSelectedEarthquake(null)}
          />
        </div>
      )}
    </div>
  );
}
