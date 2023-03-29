import { LatLng } from "react-native-maps";
// This helper function is used to trim a string from the beginning and end of the string
// Users can specify which characters to trim from the string
/**
  @param {string[]} characters - An array of characters to trim from the string
  @param {string} str - The string to trim
  @returns {string} The trimmed string
**/
export function trimChar(characters: string[], str: string): string {
  const regex = new RegExp(
    `^[${characters.join("")}]+|[${characters.join("")}]+$`,
    "g"
  );
  return str.replace(regex, "");
}

// Get distance between two geo points
/** 
  @param {LatLng} point1 - The first point
  @param {LatLng} point2 - The second point
  @returns {number} The distance between the two points in metres
**/
export const getDistance = (point1: LatLng, point2: LatLng) => {
  const R = 6371e3; // metres
  const φ1 = (point1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
};

// Function to format date
/*
    @param {Date} date - The date to format
    @returns {string} The formatted date
  */
export const formatDate = (date: Date) => {
  return date.toLocaleString("default", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
