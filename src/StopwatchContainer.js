import Stopwatch from './Stopwatch';
import parseDuration from './parseDuration';
import formatDuration from './formatDuration';
import {persistNewStopwatch, persistStopwatches, removeStopwatch, persistStopwatch} from './stopwatchStorage';
import {throttle} from 'lodash';

export default function StopwatchContainer({interval, stopwatches, setStopwatches, tick, updateStopwatchState}) {
  const displayTotalTimeThrottled = throttle(displayTotalTime, 1000);

  return (
    <div className="app-container">
      <div className="app-body">
        {stopwatches.map(stopwatch => (
          <Stopwatch key={stopwatch.id} stopwatch={stopwatch} onToggle={toggleStopwatch} onSelect={selectStopwatch}
                     onDurationChange={updateStopwatchDuration} onDurationBlur={updateStopwatchElapsedTime} onLabelChange={updateStopwatchLabel}/>))}
      </div>
      <footer className="app-footer">
        <div className={'duration-total duration'}>{displayTotalTimeThrottled(stopwatches)}</div>
        <button type="button" className={'button-primary'}
                onClick={containerAction}>{getContainerButtonText(stopwatches)}</button>
        <button type="button" className={'button-secondary'}
                onClick={resetAllStopwatches}>Reset</button>
      </footer>
    </div>
  );

  function addStopwatch() {
    setStopwatches((stopwatches) => {
      const stopwatch = {
        id: Math.max(...stopwatches.map((s) => s.id)) + 1,
        startTime: 0,
        elapsedTime: 0,
        displayTime: 0,
        durationInputString: null,
        label: 'Stopwatch',
        isPaused: true,
        isSelected: false,
        timeoutId: null
      };

      persistNewStopwatch(stopwatch);
      return [
        ...stopwatches,
        stopwatch
      ];
    });
  }

  function containerAction() {
    const selectedStopwatches = stopwatches.filter((s) => s.isSelected);

    if (selectedStopwatches.length === 0) {
      addStopwatch();
    } else {
      deleteStopwatches(selectedStopwatches);
    }
  }

  function deleteStopwatches(selectedStopwatches) {
    setStopwatches((stopwatches) => {
      const stopwatchIds = selectedStopwatches.map((s) => s.id);

      for (const stopwatch of stopwatches.filter((s) => stopwatchIds.indexOf(s.id) !== -1)) {
        if (stopwatch.timeoutId !== null) {
          clearInterval(stopwatch.timeoutId);
        }
        removeStopwatch(stopwatch);
      }

      return stopwatches.filter((s) => stopwatchIds.indexOf(s.id) === -1);
    });
  }

  function resetAllStopwatches() {
    setStopwatches((stopwatches) => {
      const updatedStopwatches = stopwatches.map((s) => {
        if (s.timeoutId !== null) {
          clearInterval(s.timeoutId);
        }
        return {
          ...s,
          startTime: 0,
          elapsedTime: 0,
          displayTime: 0,
          durationInputString: null,
          isPaused: true,
          isSelected: false,
          timeoutId: null
        };
      });

      persistStopwatches(updatedStopwatches);
      return updatedStopwatches;
    });
  }

  function selectStopwatch(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      isSelected: !stopwatch.isSelected
    };

    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function toggleStopwatch(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      isPaused: !stopwatch.isPaused
    };

    if (updatedStopwatch.isPaused) {
      clearInterval(stopwatch.timeoutId);
      updatedStopwatch.timeoutId = null;
      updatedStopwatch.elapsedTime += (new Date()).getTime() - updatedStopwatch.startTime;
    } else {
      updatedStopwatch.timeoutId = setInterval(tick, interval, stopwatch.id);
      updatedStopwatch.startTime = (new Date()).getTime();
    }

    persistStopwatch(updatedStopwatch);
    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function updateStopwatchLabel(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      label: event.target.value
    };

    persistStopwatch(updatedStopwatch);
    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function updateStopwatchDuration(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      durationInputString: event.target.value
    };

    persistStopwatch(updatedStopwatch);
    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function updateStopwatchElapsedTime(event, stopwatch) {
    const duration = parseDuration(event.target.value);
    const updatedStopwatch = {
      ...stopwatch,
      elapsedTime: duration,
      displayTime: duration,
      durationInputString: null
    };

    persistStopwatch(updatedStopwatch);
    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function displayTotalTime(stopwatches) {
    return formatDuration(stopwatches.map(s => s.displayTime).reduce((a, b) => a + b, 0))
  }
};

function getContainerButtonText(stopwatches) {
  if (stopwatches.findIndex((s) => s.isSelected) === -1) {
    return 'Add';
  }
  return 'Delete';
}