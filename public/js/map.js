mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates,
  zoom: 9
});

new mapboxgl.Marker({ color: "#FF385C" })
  .setLngLat(coordinates)
  .addTo(map);

  console.log("Loaded map.js");
  console.log("Token:", mapToken);
  console.log("Coords:", coordinates);
  