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
