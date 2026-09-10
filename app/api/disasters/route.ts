import { NextResponse } from "next/server";
import { fetchEarthquakes } from "@/app/lib/earthquakes/service";

export async function GET() {
  try {
    const earthquakes = await fetchEarthquakes();

    return NextResponse.json({
      total: earthquakes.length,
      data: earthquakes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los eventos sísmicos" },
      { status: 500 },
    );
  }
}
