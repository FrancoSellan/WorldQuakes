# 🌍 WorldQuakes

Una plataforma web interactiva construida con **Next.js** para monitorear y visualizar catástrofes y eventos naturales en tiempo real e históricos alrededor del mundo (terremotos, incendios forestales, tormentas severas, erupciones volcánicas).

El sistema consume y unifica datos oficiales de organismos científicos como el **USGS** (*U.S. Geological Survey*) y **NASA EONET** (*Earth Observatory Natural Event Tracker*), procesándolos en el servidor para ofrecer una interfaz fluida e intuitiva.

---

## ✨ Características

- 🗺️ **Mapa Global Interactivo:** Visualización geoespacial con renderizado de marcadores y soporte para clustering.
- ⚡ **Datos en Tiempo Real y Normalizados:** Integración de múltiples fuentes de datos abiertas bajo un esquema de datos unificado.
- 🔍 **Filtros Dinámicos:** Búsqueda por categoría de evento (sismos, incendios, tormentas, etc.) y rangos temporales.
- 🚀 **Arquitectura en Servidor con Caché:** Manejo de peticiones y normalización mediante Next.js Route Handlers y Server Components para optimizar el consumo de APIs externas.

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Mapas:** Leaflet / Mapbox GL JS *(o react-map-gl)*
- **Fuentes de Datos:**
  - [USGS Earthquake API](https://earthquake.usgs.gov/) (Sismos y alertas tectónicas)
  - [NASA EONET API](https://eonet.gsfc.nasa.gov/) (Incendios, tormentas, volcanes)