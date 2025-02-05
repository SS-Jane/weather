import cities from "cities.json";

/**
 * Calculate the Levenshtein distance between two strings.
 * @param {string} a - First string.
 * @param {string} b - Second string.
 * @returns {number} - The distance between the strings.
 */
const calculateLevenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) {
    for (let j = 0; j <= b.length; j++) {
      if (i === 0) {
        matrix[i][j] = j;
      } else if (j === 0) {
        matrix[i][j] = i;
      } else if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // Deletion
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j - 1] + 1 // Substitution
        );
      }
    }
  }

  return matrix[a.length][b.length];
};

/**
 * Find the closest city name to the given input.
 * @param {string} query - The city name to check.
 * @param {number} maxDistance - Maximum Levenshtein distance for suggestions.
 * @returns {string | null} - Closest matching city or null if none found.
 */
export const findClosestCity = (query, maxDistance = 3) => {
  let closestCity = null;
  let smallestDistance = Infinity;

  cities.forEach((city) => {
    const distance = calculateLevenshteinDistance(
      query.toLowerCase(),
      city.name.toLowerCase()
    );

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestCity = city.name;
    }
  });

  return smallestDistance <= maxDistance ? closestCity : null;
};
