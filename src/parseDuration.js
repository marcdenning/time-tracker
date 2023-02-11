/**
 * Parse a duration string into a number of milliseconds.
 * @param {String} durationString character string representing time duration in HH:mm:ss
 * @returns {Number} number of milliseconds represented by duration string
 */
export default function parseDuration(durationString) {
  const tokens = durationString.split(':');

  if (tokens.length !== 3) {
    throw new Error('Duration string is not valid. Expected HH:mm:ss.');
  }
  const [hours, minutes, seconds] = tokens;

  for (const token of tokens) {
    if (!token.match(/\d\d/)) {
      throw new Error('Duration value is not numeric.');
    }
  }
  return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
}
