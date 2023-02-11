const STORAGE_KEY = 'stopwatches';

export function getStopwatches() {
  const stopwatchesString = window.localStorage.getItem(STORAGE_KEY);

  if (stopwatchesString === null) {
    return [{
      id: 0,
      startTime: 0,
      elapsedTime: 0,
      displayTime: 0,
      durationInputString: null,
      label: 'Stopwatch',
      isPaused: true,
      isSelected: false,
      timeoutId: null
    }];
  }
  return JSON.parse(stopwatchesString);
}

export function persistNewStopwatch(stopwatch) {
  const stopwatches = getStopwatches();

  stopwatches.push(stopwatch);
  persistStopwatches(stopwatches);
}

export function persistStopwatch(updatedStopwatch) {
  const stopwatches = getStopwatches().map(stopwatch => {
    if (stopwatch.id === updatedStopwatch.id) {
      return updatedStopwatch;
    }
    return stopwatch
  });

  persistStopwatches(stopwatches);
}

export function removeStopwatch(stopwatch) {
  const stopwatches = getStopwatches().filter(s => s.id !== stopwatch.id);

  persistStopwatches(stopwatches);
}

export function persistStopwatches(stopwatches) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stopwatches));
}
