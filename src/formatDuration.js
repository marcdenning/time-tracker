/**
 * Format a time duration.
 * @param {Number} elapsedMilliseconds time in milliseconds to format
 * @returns {string} formatted duration such as 00:00:00 (HH:mm:ss)
 */
export default function formatDuration(elapsedMilliseconds) {
  return Math.floor(elapsedMilliseconds / 1000 / 60 / 60 % 60).toString().padStart(2, '0') + ':'
    + Math.floor(elapsedMilliseconds / 1000 / 60 % 60).toString().padStart(2, '0') + ':'
    + Math.floor(elapsedMilliseconds / 1000 % 60).toString().padStart(2, '0');
};
