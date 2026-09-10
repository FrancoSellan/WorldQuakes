import type { UsgsFeature } from "@/app/lib/earthquakes/models";

export interface UsgsFeedResponse {
  features: UsgsFeature[];
}
