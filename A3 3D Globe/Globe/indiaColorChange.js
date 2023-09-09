// Define a function to change the color of India-related points
function changeIndiaColor(surface) {
  const indiaLatitude = 20.5937;
  const indiaLongitude = 78.9629;
  const tolerance = 2.0; // Adjust this value to define the range

  // Calculate the latitude and longitude range for India
  const minLatitude = indiaLatitude - tolerance;
  const maxLatitude = indiaLatitude + tolerance;
  const minLongitude = indiaLongitude - tolerance;
  const maxLongitude = indiaLongitude + tolerance;

  // Check if the point falls within the range for India
  surface.group.traverse((child) => {
    if (child instanceof THREE.Points) {
      const geometry = child.geometry;
      const attributes = geometry.attributes;
      const positions = attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const globeLatitude = (1 - positions.getY(i)) * 180 - 90;
        const globeLongitude = positions.getX(i) * 360 - 180;

        if (
          globeLatitude >= minLatitude &&
          globeLatitude <= maxLatitude &&
          globeLongitude >= minLongitude &&
          globeLongitude <= maxLongitude
        ) {
          // Set the color for the points within the India range
          const customColor = new THREE.Color(0x09914f); // Green color
          attributes.color.set(customColor);
        }
      }

      geometry.attributes.color.needsUpdate = true; // Update the colors
    }
  });
}

// Export the function for external use
export { changeIndiaColor };
