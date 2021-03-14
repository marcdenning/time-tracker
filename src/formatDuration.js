export default function formatDuration(elapsedMilliseconds) {
  return Math.floor(elapsedMilliseconds / 1000 / 60 / 60 % 60).toString().padStart(2, '0') + ':'
    + Math.floor(elapsedMilliseconds / 1000 / 60 % 60).toString().padStart(2, '0') + ':'
    + Math.floor(elapsedMilliseconds / 1000 % 60).toString().padStart(2, '0') + ':'
    + (elapsedMilliseconds % 1000).toString().padStart(3, '0');
};
