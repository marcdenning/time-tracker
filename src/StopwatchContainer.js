import Stopwatch from './Stopwatch';

export default function StopwatchContainer({interval, stopwatches, setStopwatches}) {
  return (
    <div className="app-container">
      <div className="app-body">
        {stopwatches.map(stopwatch => (
          <Stopwatch key={stopwatch.id} stopwatch={stopwatch} onToggle={toggleStopwatch} onSelect={selectStopwatch}
                     onLabelChange={updateStopwatchLabel}/>))}
      </div>
      <footer className="app-footer">
        <button type="button" className={'button-primary'}
                onClick={containerAction}>{getContainerButtonText(stopwatches)}</button>
      </footer>
    </div>
  );

  function addStopwatch() {
    setStopwatches((stopwatches) => [
      ...stopwatches,
      {
        id: Math.max(...stopwatches.map((s) => s.id)) + 1,
        startTime: 0,
        elapsedTime: 0,
        displayTime: 0,
        label: 'Stopwatch',
        isPaused: true,
        isSelected: false,
        timeoutId: null
      }
    ]);
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
      }

      return [
        ...stopwatches.filter((s) => stopwatchIds.indexOf(s.id) === -1)
      ];
    });
  }

  function selectStopwatch(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      isSelected: !stopwatch.isSelected
    };

    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function tick(stopwatchId) {
    setStopwatches((stopwatches) => {
      const stopwatch = stopwatches.find((s) => s.id === stopwatchId);
      const updatedStopwatch = {
        ...stopwatch,
        displayTime: stopwatch.elapsedTime + (new Date()).getTime() - stopwatch.startTime
      };

      return updateStopwatchState(updatedStopwatch)(stopwatches);
    });
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

    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function updateStopwatchLabel(event, stopwatch) {
    setStopwatches(updateStopwatchState({
      ...stopwatch,
      label: event.target.value
    }));
  }

  function updateStopwatchState(updatedStopwatch) {
    return (stopwatches) => {
      const targetIndex = stopwatches.findIndex((s) => s.id === updatedStopwatch.id);

      return [
        ...stopwatches.slice(0, targetIndex),
        updatedStopwatch,
        ...stopwatches.slice(targetIndex + 1, stopwatches.length)
      ]
    };
  }
};

function getContainerButtonText(stopwatches) {
  if (stopwatches.findIndex((s) => s.isSelected) === -1) {
    return 'Add';
  }
  return 'Delete';
}